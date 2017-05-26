'use strict';

const reducer = require('./step/reducer');

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
 * Generates a single function given N functions.
 *
 * @param {array[function]} transforms
 * @return {function}
 */
function compose(...transforms) {
  return initial => _reduceRight(reducer.func, transforms, initial);
}

/**
 * Curry a function.
 *
 * @param {function} func
 * @param {number} arity
 * @param {array[mixed]} captured
 * @return {function}
 */
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

module.exports = {
  call,
  compose,
  counter,
  curry,
  identity,
  negate,
  reduce,
  times
};
