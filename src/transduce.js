'use strict';

const Type = require('./type'),
      remap = require('./remap'),
      build = require('./build'),
      Iterable = require('./iterable');

/**
 * Iterates using an iterable updating state with each result.
 *
 * @param {function} reducer
 * @param {mixed} accumulator
 * @param {Iterable} iterable
 */
function _accumulate(reducer, state, iterable) {
  for (let input of iterable) {
    state = reducer(state, ...(Iterable.spreadable(input)));
  }

  return state;
}

/**
 * Applies transform to each each element in iterable and runs the result
 * through the reducer passing the current state as the accumulator and 
 * the transformed element as input.
 *
 * @param {function} transform
 * @param {function} reducer
 * @param {Iterable} state
 * @param {Iterable} iterable
 * @return {Iterable}
 */
function transduce(transform, reducer, state, iterable) {
  return _accumulate(transform(reducer), state, Iterable.iterator(iterable));
}

/**
 * Applies transform to each each element in iterable and appends it
 * to state (collection).
 *
 * @param {function} transform
 * @param {Iterable} state
 * @param {Iterable} iterable
 * @return {Iterable}
 */
function into(transform, state, iterable) {
  // TODO: reduce this into a single call.
  let step = build.for(state);

  if (Type.differ(state, iterable)) {
    if (remap.exists(iterable, state)) {
      step = remap.between(iterable, state);
    }
  }

  return transduce(transform, step, state, iterable);
}

/**
 * Applies transform to each each element in iterable and appends it
 * to a new iterable of the same kind as iterable.
 *
 * @param {function} transform
 * @param {Iterable} iterable
 * @return {Iterable}
 */
function sequence(transform, iterable) {
  return into(transform, Iterable.from(iterable), iterable);
}

module.exports = {
  into,
  sequence,
  transduce
};
