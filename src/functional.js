'use strict';

const reducing = require('./reducing');

/**
 * Generates a function that returns the complement of predicate..
 *
 * @param {mixed} input
 * @return {mixed}
 */
function negate(predicate) {
  return (...args) => !predicate(...args);
}

/**
 * Given input, input is returned.
 *
 * @param {mixed} input
 * @return {mixed}
 */
function identity(input) {
  return input;
}

/**
 * Create a function that passes the iteration number to func on each call.
 *
 * @param {function} func
 * @return {function}
 */
function counter(func) {
  let iteration = 0;

  return (...args) => func(iteration++, ...args);
};

/**
 * @param {function} iteratee
 * @param {array[]} collection
 * @param {mixed} accumulator
 * @return {function}
 */
function _reduceRight(iteratee, collection, accumulator) {
  for (let i = (collection.length - 1); i >= 0; i--) {
    accumulator = iteratee(accumulator, collection[i]);
  }

  return accumulator;
}

/**
 * Generates a single function given N functions.
 *
 * @param {array[function]} transforms
 * @return {function}
 */
function compose(...transforms) {
  return initial => _reduceRight(reducing.func, transforms, initial);
}

/**
 * Iterates using an iterator updating state with each result.
 *
 * @param {function} reducer
 * @param {mixed} accumulator
 * @param {Iterable} iterator
 */
function accumulate(reducer, accumulator, iterator) {
  for (let value of iterator) {
    accumulator = reducer(accumulator, value);
  }

  return accumulator;
}

module.exports = {
  accumulate,
  counter,
  identity,
  negate,
  compose
};
