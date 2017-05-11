'use strict';

const reducer = require('./step/reducer');

/**
 * Determine if the input is even.
 *
 * @param {number} input
 * @return {boolean}
 */
function isEven (x) { return (x % 2) === 0; }

/**
 * Determine if the input is odd.
 *
 * @param {number} input
 * @return {boolean}
 */
const isOdd = negate(isEven);

/**
 * Calls the passed function returning the result.
 *
 * TODO: consider forwarding rest args
 *
 * @param {function} func
 * @return {mixed}
 */
function call(func) {
  return func();
}

/**
 * Generates a function that returns the complement of predicate.
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
}

/**
 * @param {function} iteratee
 * @param {array[]} collection
 * @param {mixed} accumulator
 * @return {function}
 */
function _reduceRight(iteratee, collection, accumulator) {
  for (let i = (collection.length - 1); i >= 0; i--) {
    accumulator = iteratee(accumulator, collection[i], i, collection.length);
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
  return initial => _reduceRight(reducer.func, transforms, initial);
}

module.exports = {
  isEven,
  isOdd,
  counter,
  identity,
  negate,
  call,
  compose
};
