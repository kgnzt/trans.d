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
 * Prepends the current iteration to input sequence. Stateful.
 *
 * @return {function}
 */
function enumerate() {
  return transducer((step, state, ...inputs) => {
    const [ output, iteration ] = unwrap(state, 0);
  
    return wrap(step(output, iteration, ...inputs), iteration + 1);
  });
};

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
 * Reduce inputs into output state.
 *
 * @param {function} step
 * @return {function}
 */
const cat = transducer((step, state, ...inputs) => {
  return Functional.reduce(step, state, ...inputs);
});

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
 * Adds additional inputs between each output. Stateful.
 *
 * @param {...mixed} interpose
 * @return {function}
 */
function interpose(...interpose) {
  return transducer((step, state, ...inputs) => {
    let [ outter, iteration ] = unwrap(state, 0);

    if (iteration !== 0) {
      outter = step(outter, ...interpose)
    }

    return wrap(step(outter, ...inputs), iteration + 1);
  });
}

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

module.exports = {
  buffer,
  cat,
  dedupe,
  drop,
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
