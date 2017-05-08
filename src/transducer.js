'use strict';

const lodash = require('lodash'),
      functional = require('./functional');

// TODO: consider NOT exporting forward or importing it from another module.
// TODO: it is not a transducer, its a helper.

/**
 * Correctly forwards inputs with any updated values in a transducer ->
 * transducer chain.
 *
 * @param {array[mixed]} inputs
 * @param {mixed} value - new initial input (output) for next transducer
 */
function forward(inputs, value) {
  if (inputs.length > 1) {
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
  return build => {
    return functional.counter((iteration, state, ...inputs) => {
      return (iteration >= count) ? state : build(state, ...inputs);
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
  return build => {
    return functional.counter((iteration, state, ...inputs) => {
      return (iteration < count) ? state : build(state, ...inputs);
    });
  };
}

/**
 * Evaluates iteratee with the initial input.
 *
 * @param {function} iteratee
 * @return {function}
 */
function map(iteratee) {
  return build => {
    return (state, ...inputs) => {
      return build(state, ...(forward(inputs, iteratee(...inputs))));
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
  return build => {
    return (state, ...inputs) => {
      return predicate(...inputs) ? build(state, ...inputs) : state;
    };
  };
}

module.exports = {
  forward,
  drop,
  filter,
  identity: functional.identity,
  map,
  negate: functional.negate,
  take
};
