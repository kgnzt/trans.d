'use strict';

const Iterable = require('../iterable');

/**
 * State wrapper used for stateful transducers.
 */
class Wrapper {
  /**
   * @param {mixed} outter
   * @param {mixed} inner
   */
  constructor(outter, inner) {
    this.outter = outter;
    this.inner = inner;
  }
}

/**
 * Determine if a state is wrapped.
 *
 * @param {mixed} state
 * @return {boolean}
 */
function isWrapped(state) {
  return (state instanceof Wrapper);
}

/**
 * Wrap state.
 *
 * Wraps the state using state as outter and value as inner state if not wrapped.
 * Updates wrapper inner if already wrapped.
 *
 * @param {mixed} state
 * @param {mixed} state
 * @return {Wrapper}
 */
function wrap(state, value) {
  if (isWrapped(state)) {
    state.inner = value;

    return state;
  }

  return new Wrapper(state, value);
}

/**
 * Return transducer's inner state.
 *
 * @param {mixed} state
 * @param {mixed} state
 * @return {mixed}
 */
function inner(state, value) {
  if (isWrapped(state)) {
    return state.inner;
  }

  return value;
}

/**
 * Return transducer's outter state.
 *
 * @param {mixed} state
 * @return {mixed}
 */
function outter(state) {
  if (isWrapped(state)) {
    return state.outter;
  }

  return state;
}

/**
 * Return unwrapped state.
 *
 * If wrapped the outter state is returned.
 * If not wrapped state is returned as is.
 *
 * @param {mixed} state
 * @return {mixed}
 */
function unwrap(state) {
  if (isWrapped(state)) {
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
  isWrapped,
  unwrap,
  outter
};
