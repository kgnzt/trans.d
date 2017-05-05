'use strict';

const lodash = require('lodash'),
      type = require('./type'),
      build = require('./build'),
      iterable = require('./iterable'),
      functional = require('./functional');

/**
 * Applies transform to each each element in iterator and runs the result
 * through the reducer passing the current initial as the accumulator and 
 * the transformed element as input.
 *
 * @param {function}
 * @param {Iterable}
 * @param {Iterable}
 * @return {Iterable}
 */
function transduce(transform, reducer, initial, iterator) {
  iterator = iterable.iterator(iterator); // adds additional iterator support

  return functional.accumulate(transform(reducer), initial, iterator);
}

/**
 * Applies transform to each each element in iterator and appends it
 * to a collection.
 *
 * @param {function}
 * @param {Iterable}
 * @param {Iterable}
 * @return {Iterable}
 */
function into(transform, collection, iterator) {
  return transduce(transform, build.for(collection), collection, iterator);
}

/**
 * Applies transform to each each element in iterator and appends it
 * to a new iterable of the same kind as iterator.
 *
 * @param {function}
 * @param {Iterable}
 * @return {Iterable}
 */
function sequence(transform, iterator) {
  return into(transform, iterable.from(iterator), iterator);
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
