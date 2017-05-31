'use strict';

const reducer = require('./step/reducer');

/**
 * Curry a function.
 *
 * @param {function} func
 * @param {number} arity
 * @param {array[mixed]} captured
 * @return {function}
 */
/*
function curry(func, arity, captured = []) {
  arity = arity || func.length;

  return (...args) => {
    captured.push(...args);

    if (captured.length >= arity) {
      return func(...captured);
    }

    return curry(func, arity, captured);
  };
}
*/
const curry = (f, ...args) => (f.length <= args.length) ? 
  f(...args) : 
    (...more) => curry(f, ...args, ...more);

/**
 * Use access operator to return value.
 *
 * @param {array|object} subject - must be able to use access operator
 * @return {mixed} index
 */
const access = curry((path, subject) => {
  return subject[path];
});

/**
 * Peforms (calls) iteratee count times.
 *
 * @param {number} count
 * @param {function} func
 * @return {mixed}
 */
function times(count, iteratee) {
  let result;

  for (let i = 0; i < count; i++) {
    result = iteratee();
  }

  return result;
}

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
 * Iterates using an iterable updating state with each result.
 *
 * TODO: unit-test
 *
 * @param {function} reducer
 * @param {mixed} accumulator
 * @param {Iterable} iterable
 * @return {Iterable} mixed
 */
function reduce(reducer, state, iterable) {
  for (let input of iterable) {
    state = reducer(state, input);
  }

  return state;
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
 * Generates a single function given N functions. Right to left.
 *
 * @param {array[function]} transforms
 * @return {function}
 */
function compose(...transforms) {
  return initial => _reduceRight(reducer.func, transforms, initial);
}

/**
 * Generates a single function given N functions. Left to right.
 *
 * @param {array[function]} transforms
 * @return {function}
 */
function pipe(...transforms) {
  return initial => reduce(reducer.func, initial, transforms);
}

/**
 * Determine if left is identical to right.
 *
 * @param {mixed} left
 * @param {mixed} right
 * @return {boolean}
 */
const isIdentical = curry((right, left) => left === right);

/**
 * Determine if left is equal to right.
 *
 * @param {mixed} left
 * @param {mixed} right
 * @return {boolean}
 */
const isEqual = curry((right, left) => left == right);

/**
 * Determine if left is not identical to right.
 *
 * @param {mixed} left
 * @param {mixed} right
 * @return {boolean}
 */
const isNotIdentical = curry((right, left) => left != right);

/**
 * Determine if left is not equal to right.
 *
 * @param {mixed} left
 * @param {mixed} right
 * @return {boolean}
 */
const isNotEqual = curry((right, left) => left != right);

/**
 * Determine if left is greater than right.
 *
 * @param {mixed} left
 * @param {mixed} right
 * @return {boolean}
 */
const greaterThan = curry((right, left) => left > right);

/**
 * Determine if left is greater than or equal to right.
 *
 * @param {mixed} left
 * @param {mixed} right
 * @return {boolean}
 */
const greaterThanOrEqualTo = curry((right, left) => left >= right);

/**
 * Determine if left is less than right.
 *
 * @param {mixed} left
 * @param {mixed} right
 * @return {boolean}
 */
const lessThan = curry((right, left) => left < right);

/**
 * Determine if left is less than or equal to right.
 *
 * @param {mixed} left
 * @param {mixed} right
 * @return {boolean}
 */
const lessThanOrEqualTo = curry((right, left) => left <= right);

module.exports = {
  access,
  call,
  compose,
  pipe,
  counter,
  curry,
  isIdentical,
  isEqual,
  isNotIdentical,
  isNotEqual,
  lessThanOrEqualTo,
  lessThan,
  greaterThan,
  greaterThanOrEqualTo,
  identity,
  negate,
  reduce,
  times
};
