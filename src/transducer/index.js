'use strict';

const Helper      = require('../helper'),
      Iterable    = require('../iterable'),
      Lens        = require('../lens'),
      Transduce   = require('../transduce'),
      Functional  = require('../functional'),
      { Action,
        wrap,
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

// should be injectable, default customizable
const lensFor = Lens.make(Lens.Lens);

/**
 * Subtransform input using a lens.
 *
 * @param {mixed} path
 * @param {function} transform
 * @return {function}
 */
function lens(path, transform) {
  return transducer((step, state, input) => {
    const lens = lensFor(input)(path);

    return step(state, Lens.set(
      lens,
      Transduce.sequence(transform, Lens.view(lens, input)),
      input
    ));
  });
}

function lensOver(path, transform) {
  return transducer((step, state, input) => {
    const lens = lensFor(input)(path);

    return step(state, ...Lens.set(
      lens,
      input,
      [Transduce.sequence(transform, Lens.view(lens, input))]
    ));
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
 * Filter input sequence down to it's maxima.
 *
 * @param {function} step
 * @return {function}
 */
const maxima = transducer((step, state, input) => {
  const [ outter, [anteprev, prev] ] = unwrap(state, []);

  if (_isMaxima(anteprev, prev, input)) {
    return wrap(step(outter, prev), [prev, input], Action.repeat);
  }

  return wrap(state, [prev, input], Action.repeat);
});

/**
 * Map associative container keys.
 *
 * @return {function} iteratee
 * @return {function}
 */
function rekey(iteratee) {
  return Functional.compose(
    swap(0, 1),
    map(iteratee),
    swap(0, 1)
  );
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
      return wrap(state, iteration + 1, Action.terminate);
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
function _isMaxima(previous, current, next) {
  if (previous === undefined) {
    return (current > next);
  } else if (next === undefined) {
    return (current > previous);
  }

  return (current > previous) && (next < current);
}

module.exports = {
  buffer,
  cat,
  curry,
  dedupe,
  drop,
  enumerate,
  filter,
  identity: Functional.identity,
  interpose,
  lens,
  lensOver,
  map,
  negate: Functional.negate,
  maxima,
  rekey,
  repeat,
  reverse,
  swap,
  take
};
