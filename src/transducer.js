'use strict';

const lodash = require('lodash'),
      State = require('./state'),
      Iterable = require('./iterable'),
      functional = require('./functional');

// TODO: consider NOT exporting forward or importing it from another module.
// TODO: it is not a transducer, its a helper.

function enumerate() {
  return step => {
    return (state, ...inputs) => {
      let iteration = State.init(state).with(0);
      console.log(iteration);

      state = State.unwrap(state);

      return State.wrap(step(state, ...inputs), iteration++);
    };
  };
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
 * TODO: move to functional, can we use reduce in tranduce with iterable spread?
 *
 * @param {function} reducer
 * @param {mixed} accumulator
 * @param {Iterable} iterable
 * @return {Iterable} mixed
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
      return step(state, ...(forward(inputs, iteratee(...inputs))));
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
 * Interpose additional input between output.
 *
 * @return {function} Dedupe transducer.
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

module.exports = {
  forward,
  enumerate,
  dedupe,
  interpose,
  drop,
  cat,
  filter,
  identity: functional.identity,
  map,
  negate: functional.negate,
  take
};
