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
 * Calls the input with the accumulator.
 *
 * @param {mixed}
 * @param {mixed}
 */
function func(accumulator, input, ...rest) {
  return input(accumulator, ...rest);
}

module.exports = {
  identity,
  func
};
