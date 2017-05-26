'use strict';

const lodash     = require('lodash'),
      State      = require('../state'),
      Helper     = require('../helper'),
      Iterable   = require('../iterable'),
      API        = require('./api'),
      Functional = require('../functional');

// TODO: consider NOT exporting forward or importing it from another module.
// TODO: it is not a transducer, its a helper.

function enumerate() {
  let iteration = 0;
  return step => {
    return (state, ...inputs) => {
      return step(state, iteration++, ...inputs)
    };
  };
}

/**
 * Includes the first N inputs.
 *
 * @param {number} count
 * @return {function}
 */
function take(count) {
  return step => {
    return Functional.counter((iteration, state, ...inputs) => {
      return (iteration >= count) ? state : step(state, ...inputs);
    });
  };
}

/**
 * Removes the first N inputs.
 *
 * @param {number} count
 * @return {function}
 */
function drop(count) {
  return step => {
    return Functional.counter((iteration, state, ...inputs) => {
      return (iteration < count) ? state : step(state, ...inputs);
    });
  };
}

/**
 * Iterates using an iterable updating state with each result.
 *
 * TODO: move to functional, can we use reduce in tranduce with iterable spread?
 *
 * @param {function} reducer
 * @param {mixed} accumulator
 * @param {Iterable} iterable
 * @return {Iterable} mixed
 */
function reduce(reducer, state, iterable) {
  for (let input of iterable) {
    state = reducer(state, input);
  }

  return state;
}

/**
 * Evaluates iteratee with the initial input.
 *
 * @param {function} iteratee
 * @return {function} Cat transducer.
 */
function cat(step) {
  return (state, ...input) => {
    return reduce(step, state, ...input);
  };
}

/**
 * Evaluates iteratee with the initial input.
 *
 * @param {function} iteratee
 * @return {function} Map transducer.
 */
function map(iteratee) {
  return step => {
    return (state, ...inputs) => {
      return step(state, ...(API.forward(inputs, iteratee(...inputs))));
    };
  };
}

// TODO: unit-test to see if step() needs a forward call for filter and dedupe...

/**
 * Includes inputs where the predicate returns true.
 *
 * @param {function} predicate
 * @return {function} Filter transducer.
 */
function filter(predicate) {
  return step => {
    return (state, ...inputs) => {
      return predicate(...inputs) ? step(state, ...inputs) : state;
    };
  };
}

/**
 * Stateful transducer that removes duplicate inputs.
 *
 * @return {function} Dedupe transducer.
 */
function dedupe() {
  const set = new Set();

  return step => {
    return (state, ...inputs) => {
      state = set.has(...inputs) ? state : step(state, ...inputs);

      set.add(...inputs);

      return state;
    };
  };
}

/**
 * Stateful transducer that adds additional input between each output.
 *
 * @return {function} Interpose transducer.
 */
function interpose(...interpose) {
  let iteration = 0;

  return step => {
    return (state, ...inputs) => {
      if (iteration !== 0) {
        state = step(state, ...interpose);
      }

      iteration += 1;

      return step(state, ...inputs);
    };
  };
}

/**
 * Stateful transducer that curries extra inputs.
 *
 * @todo: unit-test
 *
 * @param {function} step
 * @return {function}
 */
function curry(...additional) {
  return (state, ...inputs) => {
    return step(state, ...(inputs.concat(additional)));
  };
}

/**
 * Repeats input.
 *
 * @param {function} step
 * @return {function}
 */
function repeat(count) {
  return step => {
    return (state, ...inputs) => {
      return Functional.times(count, () => step(state, ...inputs));
    };
  };
}

/**
 * Repeats input.
 *
 * @param {function} step
 * @return {function}
 */
function buffer(size) {
  let buffer = [],
      iteration = 0;

  return step => {
    return (state, ...inputs) => {
      if (iteration < size) {
        buffer.push([...inputs]);
        iteration++;
      }

      if (iteration === size) {
        const result = step(state, buffer)

        iteration = 0;
        buffer = [];

        return result;
      }

      return state;
    };
  };
}

function collect() {
  return step => {
    return (state, ...inputs) => {
      let d = state[0] || [];
      d.push(...inputs);
      state[0] = d;

      return step(state, d);
    };
  };
}

/**
 * Stateful transducer that reverses input sequence.
 *
 * @todo unit-test, export
 *
 * @param {function} step
 * @return {function}
 */
function count() {
  const i = 1;

  return step => {
    return (state, ...inputs) => {
      return step(state, i++, ...inputs);
    };
  };
}

/**
 * Stateless transducer that reverses input sequence.
 *
 * @param {function} step
 * @return {function}
 */
function reversed(step) {
  return (state, ...inputs) => {
    return step(state, ...inputs.reverse());
  };
}

/**
 * Stateless transducer that reverses input sequence.
 *
 * @param {function} step
 * @return {function}
 */
function swap(a, b) {
  return step => {
    return (state, ...inputs) => {
      return step(state, ...Helper.swap(inputs, a, b));
    };
  };
}

/**
 * Transducer to adjust output keys.
 *
 * @return {function} Rekey transducer.
 */
function rekey(iteratee) {
  return step => {
    return (state, ...inputs) => {
      return step(state, ...(Helper.swapAdjust(inputs, 0, 1, iteratee)));
    };
  };
}

module.exports = {
  rekey,
  reversed,
  swap,
  get enumerate () { return enumerate(); },
  dedupe,
  interpose,
  drop,
  repeat,
  collect,
  buffer,
  cat,
  filter,
  identity: Functional.identity,
  map,
  negate: Functional.negate,
  take
};
