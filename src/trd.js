'use strict';

const lodash = require('lodash'),
      type = require('./type'),
      build = require('./build'),
      Iterable = require('./iterable'),
      functional = require('./functional');

/**
 * Applies transform to each each element in iterable and runs the result
 * through the reducer passing the current initial as the accumulator and 
 * the transformed element as input.
 *
 * @param {function}
 * @param {Iterable}
 * @param {Iterable}
 * @return {Iterable}
 */
function transduce(transform, reducer, initial, iterable) {
  return functional.accumulate(transform(reducer), initial, Iterable.iterator(iterable));
}

/**
 * Applies transform to each each element in iterable and appends it
 * to a collection.
 *
 * @param {function}
 * @param {Iterable}
 * @param {Iterable}
 * @return {Iterable}
 */
function into(transform, collection, iterable) {
  return transduce(transform, build.for(collection), collection, iterable);
}

/**
 * Applies transform to each each element in iterable and appends it
 * to a new iterable of the same kind as iterable.
 *
 * @param {function}
 * @param {Iterable}
 * @return {Iterable}
 */
function sequence(transform, iterable) {
  return into(transform, Iterable.from(iterable), iterable);
}

/**
 * Create a transducer.
 *
 * @param {function}
 * @param {function} 
 */
function _transducer(transduction, transform, reducer, accumulator, ...inputs) {
  return transduction(transform, reducer, accumulator, ...inputs);
};

const transducer = lodash.curry(_transducer);

module.exports = {
  transducer,
  into,
  sequence,
  transduce
};
