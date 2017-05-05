'use strict';

/**
 * Returns the identity of the input.
 *
 * @param {mixed}
 * @param {mixed}
 */
function identity(accumulator, input) {
  return input;
}

/**
 * Pushes input onto accumulator.
 *
 * @param {mixed}
 * @param {mixed}
 */
function array(accumulator, input) {
  accumulator.push(input);

  return accumulator;
}

/**
 * @param {mixed}
 * @param {mixed}
 */
function map(accumulator, [key, value]) {
  accumulator.set(key, value);

  return accumulator;
}

/**
 * Calls the input with the accumulator.
 *
 * @param {mixed}
 * @param {mixed}
 */
function func(accumulator, input) {
  return input(accumulator);
}

module.exports = {
  identity,
  map,
  array,
  func
};
