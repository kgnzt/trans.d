'use strict';

const lodash      = require('lodash'),
      Helper      = require('../helper'),
      Iterable    = require('../iterable'),
      Functional  = require('../functional'),
      { wrap,
        unwrap,
        transducer,
        forward } = require('./api');

/**
 * Buffer input sequences. Stateful.
 *
 * @param {number} size
 * @return {function}
 */
function buffer(size) {
  return transducer((step, state, ...inputs) => {
    const [ output, { iteration, buffer } ] = unwrap(state, {
      iteration: 0,
      buffer: []
    });
  
    if (iteration < size) {
      buffer.push(inputs);
    }
  
    if (iteration === size - 1) {
      return wrap(step(output, buffer), {
        iteration: 0,
        buffer: []
      });
    }
  
    return wrap(output, { buffer: buffer, iteration: iteration + 1 });
  });
}

/**
 * Reduce inputs into output state.
 *
 * @param {function} step
 * @return {function}
 */
const cat = transducer((step, state, ...inputs) => {
  return Functional.reduce(step, state, ...inputs);
});

/**
 * Curry extra inputs into the input sequence.
 *
 * @todo: unit-test
 *
 * @param {...mixed} additional
 * @return {function}
 */
function curry(...additional) {
  return transducer((step, state, ...inputs) => {
    return step(state, ...(inputs.concat(additional)));
  });
}

/**
 * Removes duplicate inputs. Stateful.
 *
 * @param {function} step
 * @return {function}
 */
const dedupe = transducer((step, state, ...inputs) => {
  const [ outter, set ] = unwrap(state, new Set()); // TODO: avoid init by making unwrap take a callback...

  if (set.has(...inputs)) {
    return wrap(outter, set);
  }

  set.add(...inputs);

  return wrap(step(outter, ...inputs), set);
});

/**
 * Removes the first N inputs. Stateful.
 *
 * @param {number} count
 * @return {function}
 */
function drop(count) {
  return transducer((step, state, ...inputs) => {
    const [ output, iteration ] = unwrap(state, 0);

    if (iteration < count) {
      return wrap(state, iteration + 1);
    }

    return wrap(step(output, ...inputs), iteration + 1);
  });
}

/**
 * Prepends the current iteration to input sequence. Stateful.
 *
 * @return {function}
 */
function enumerate() {
  return transducer((step, state, ...inputs) => {
    const [ output, iteration ] = unwrap(state, 0);
  
    return wrap(step(output, iteration, ...inputs), iteration + 1);
  });
}

/**
 * Include inputs where predicate evaluates to true.
 *
 * @param {function} predicate
 * @return {function}
 */
function filter(predicate) {
  return transducer((step, state, ...inputs) => {
    return predicate(...inputs) ? step(state, ...inputs) : state;
  });
}

/**
 * Adds additional inputs between each output. Stateful.
 *
 * @param {...mixed} interpose
 * @return {function}
 */
function interpose(...interpose) {
  return transducer((step, state, ...inputs) => {
    let [ outter, iteration ] = unwrap(state, 0);

    if (iteration !== 0) {
      outter = step(outter, ...interpose);
    }

    return wrap(step(outter, ...inputs), iteration + 1);
  });
}

/**
 * Evaluate iteratee using inputs and returs result as the next input for
 * the transducer chain..
 *
 * @param {function} iteratee
 * @return {function}
 */
function map(iteratee) {
  return transducer((step, state, ...inputs) => {
    return step(state, ...(forward(inputs, iteratee(...inputs))));
  });
}

/**
 * Filter input sequence down to it's peaks.
 *
 * @param {mixed} cutoff
 * @return {function}
 */
function peaks(cutoff = 0) {
  return transducer((step, state, input) => {
    const [ outter, [anteprev, prev] ] = unwrap(state, []);

    if (_isPeak(anteprev, prev, input, cutoff)) {
      return wrap(step(outter, prev), [prev, input]);
    }

    return wrap(state, [prev, input]);
  });
}

/**
 * Adjust associative container keys.
 *
 * @return {function} iteratee
 * @return {function}
 */
function rekey(iteratee) {
  return transducer((step, state, ...inputs) => {
    return step(state, ...(Helper.swapAdjust(inputs, 0, 1, iteratee)));
  });
}

/**
 * Repeats input.
 *
 * @param {number} count
 * @return {function}
 */
function repeat(count) {
  return transducer((step, state, ...inputs) => {
    return Functional.times(count + 1, () => step(state, ...inputs));
  });
}

/**
 * Reverse input sequence.
 *
 * @param {function} step
 * @return {function}
 */
const reverse = transducer((step, state, ...inputs) => {
  return step(state, ...inputs.reverse());
});

/**
 * Swap two elements in the input sequence.
 *
 * @param {number} a
 * @param {number} b
 * @return {function}
 */
function swap(a, b) {
  return transducer((step, state, ...inputs) => {
    return step(state, ...Helper.swap(inputs, a, b));
  });
}

/**
 * Includes the first N inputs. Stateful.
 *
 * @param {number} count
 * @return {function}
 */
function take(count) {
  return transducer((step, state, ...inputs) => {
    const [ output, iteration ] = unwrap(state, 0);

    if (iteration >= count) {
      return wrap(state, iteration + 1);
    }

    return wrap(step(output, ...inputs), iteration + 1);
  });
}

/**
 * Determine if a current value in a sequence is considered a peak.
 *
 * @param {mixed}
 * @param {mixed}
 * @param {mixed}
 * @param {mixed}
 * @return {boolean}
 */
function _isPeak(previous, current, next, cutoff = 0) {
  return (current > previous) && (next < current) && (current >= cutoff);
}

module.exports = {
  buffer,
  cat,
  dedupe,
  drop,
  peaks,
  enumerate,
  filter,
  identity: Functional.identity,
  interpose,
  map,
  negate: Functional.negate,
  rekey,
  repeat,
  reverse,
  swap,
  take
};
