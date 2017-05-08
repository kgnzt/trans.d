'use strict';

const Type = require('./type'),
      remap = require('./remap'),
      build = require('./build'),
      transform = require('./transform'),
      Transducer = require('./transducer'),
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
  let step = build.for(initial);

  if (Type.differ(initial, iterable)) {
    if (remap.exists(iterable, initial)) {
      step = remap.between(iterable, initial);
    }
  }

  // TODO: Automatically map differing input types to output types
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

// TODO: write a helper function to ENSURE no overriding

module.exports = Object.assign({
  into,
  sequence,
  transduce,
  transform,
  compose: functional.compose
}, Transducer);
