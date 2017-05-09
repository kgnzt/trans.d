'use strict';

const lodash = require('lodash'),
      Iterable = require('./iterable'),
      functional = require('./functional');

// TODO: consider NOT exporting forward or importing it from another module.
// TODO: it is not a transducer, its a helper.

/**
 * Correctly forwards inputs with any updated values in a transducer ->
 * transducer chain.
 *
 * TODO: unit-test the Iterable.isInputTuple return.
 *
 * @param {array[mixed]} inputs
 * @param {mixed} value - new initial input (output) for next transducer
 */
function forward(inputs, value) {
  if (Iterable.isInputTuple(value)) {
    return value;
  } else if (inputs.length > 1) {
    return [value, ...inputs.slice(1, inputs.length)];
  }

  return [value];
}

/**
 * Includes the first N inputs.
 *
 * @param {number} count
 * @return {function}
 */
function take(count) {
  return step => {
    return functional.counter((iteration, state, ...inputs) => {
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
    return functional.counter((iteration, state, ...inputs) => {
      return (iteration < count) ? state : step(state, ...inputs);
    });
  };
}

/**
 * Iterates using an iterable updating state with each result.
 *
 * TODO: move to functional
 *
 * @param {function} reducer
 * @param {mixed} accumulator
 * @param {Iterable} iterable
 */
function reduce(reducer, state, iterable) {
  for (let input of iterable) {
    state = reducer(state, ...input);
  }

  return state;
}

/**
 * Evaluates iteratee with the initial input.
 *
 * @param {function} iteratee
 * @return {function}
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
 * @return {function}
 */
function map(iteratee) {
  return step => {
    return (state, ...inputs) => {
      return step(state, ...(forward(inputs, iteratee(...inputs))));
    };
  };
}

/**
 * Includes inputs where the predicate returns true.
 *
 * @param {function} predicate
 * @return {function}
 */
function filter(predicate) {
  return step => {
    return (state, ...inputs) => {
      return predicate(...inputs) ? step(state, ...inputs) : state;
    };
  };
}

module.exports = {
  forward,
  drop,
  cat,
  filter,
  identity: functional.identity,
  map,
  negate: functional.negate,
  take
};
