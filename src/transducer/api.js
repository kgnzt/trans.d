'use strict';

const Iterable = require('../iterable');

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

module.exports = {
  forward
};
