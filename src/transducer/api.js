'use strict';

const Iterable = require('../iterable');

class Wrapper {
  constructor(outter, inner) {
    this.outter = outter;
    this.inner = inner;
  }
}

function isWrapper(state) {
  return (state instanceof Wrapper);
}

function wrap(state, value) {
  if (isWrapper(state)) {
    state.inner = value;

    return state;
  }

  return new Wrapper(state, value);
}

function inner(state, value) {
  if (isWrapper(state)) {
    return state.inner;
  }

  return value;
}

function outter(state) {
  if (isWrapper(state)) {
    return state.outter;
  }

  return state;
}

function complete(state) {
  if (isWrapper(state)) {
    return state.outter;
  }

  return state;
}

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
  forward,
  inner,
  wrap,
  isWrapper,
  complete,
  outter
};
