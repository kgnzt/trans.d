'use strict';

const Iterable = require('../iterable');

/**
 * Transducer chain actions.
 */
const Action = {
  terminate: Symbol('terminate'),
  repeat: Symbol('repeat')
};

/**
 * State wrapper used for stateful transducers.
 */
class Wrapper {
  /**
   * @param {mixed} outter
   * @param {mixed} inner
   */
  constructor(outter, inner, action) {
    this.outter = outter;
    this.inner = inner;
    this.action = action;
  }
}

// todo: unit-test
function shouldTerminate(state) {
  return (state.action === Action.terminate);
}

// todo: unit-test
function shouldRepeat(state) {
  return (state.action === Action.repeat);
}

/**
 * Generates a transducer.
 *
 * @param {function}
 * @return {function}
 */
function transducer(transform) {
  return step => {
    return (...inputs) => {
      return transform(step, ...inputs);
    };
  };
}

/**
 * Unwrap wrapper into contintuent parts.
 *
 * @param {mixed} state
 * @param {mixed} state
 * @return {array[mixed, mixed]}
 */
function unwrap(state, value) {
  return [outter(state), inner(state, value)];
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
function wrap(state, value, action) {
  if (isWrapped(state)) {
    state.inner = value;
    state.action = action;

    return state;
  }

  return new Wrapper(state, value, action);
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
 * Return outter state.
 *
 * If wrapped the outter state is returned.
 * If not wrapped state is returned as is.
 *
 * @param {mixed} state
 * @return {mixed}
 */
function complete(state) {
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
  Action,
  complete,
  forward,
  inner,
  isWrapped,
  shouldTerminate,
  shouldRepeat,
  outter,
  transducer,
  unwrap,
  wrap
};
