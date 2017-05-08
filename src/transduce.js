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
function _accumulate(reducer, accumulator, iterable) {
  for (let value of iterable) {
    accumulator = reducer(accumulator, ...(Iterable.spreadable(value)));
  }

  return accumulator;
}

/**
 * Applies transform to each each element in iterable and runs the result
 * through the reducer passing the current initial as the accumulator and 
 * the transformed element as input.
 *
 * @param {function} transform
 * @param {function} reducer
 * @param {Iterable} initial
 * @param {Iterable} iterable
 * @return {Iterable}
 */
function transduce(transform, reducer, initial, iterable) {
  return _accumulate(transform(reducer), initial, Iterable.iterator(iterable));
}

/**
 * Applies transform to each each element in iterable and appends it
 * to initial (collection).
 *
 * @param {function} transform
 * @param {Iterable} initial
 * @param {Iterable} iterable
 * @return {Iterable}
 */
function into(transform, initial, iterable) {
  // TODO: reduce this into a single call.
  let step = build.for(initial);

  if (Type.differ(initial, iterable)) {
    if (remap.exists(iterable, initial)) {
      step = remap.between(iterable, initial);
    }
  }

  return transduce(transform, step, initial, iterable);
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
