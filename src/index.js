'use strict';

const type = require('./type'),
      build = require('./build'),
      Iterable = require('./iterable'),
      functional = require('./functional');

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
  return functional.accumulate(transform(reducer), initial, Iterable.iterator(iterable));
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
  // TODO: Automatically map differing input types to output types
  return transduce(transform, build.for(initial), initial, iterable);
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
