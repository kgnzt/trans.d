'use strict';

/**
 * Returns the identity of the input.
 *
 * @todo: its not exactly identity, needs a better name, outputInput?
 *
 * @param {mixed}
 * @param {mixed}
 */
function identity(accumulator, input) {
  return input;
}

/**
 * Calls the input with the accumulator.
 *
 * @param {mixed}
 * @param {mixed}
 */
function func(accumulator, input, ...rest) {
  return input(accumulator, ...rest);
}

/**
 * Returns the addition of input a and input b.
 *
 * @param {number} a
 * @param {number} b
 * @param {number}
 */
function sum(a, b) {
  return a + b;
}

/**
 * Returns the multiplication of input a and input b.
 *
 * @param {number} a
 * @param {number} b
 * @param {number}
 */
function product(a, b) {
  return a * b;
}

module.exports = {
  identity,
  sum,
  product,
  func
};
