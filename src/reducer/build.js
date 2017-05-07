'use strict';

const iterable = require('../iterable');

module.exports = {
  /**
   * Pushes input into accumulator.
   *
   * @param {Array}
   * @param {mixed}
   * @param {Array}
   */
  Array (accumulator, input) {
    accumulator.push(input);

    return accumulator;
  },

  /**
   * Sets input key and value on accumulator.
   *
   * @param {Map}
   * @param {array[string, mixed]}
   * @param {Map}
   */
  Map (accumulator, [key, value]) {
    accumulator.set(key, value);

    return accumulator;
  },

  /**
   * Adds input to accumulator.
   *
   * @param {Set}
   * @param {mixed}
   * @param {Set}
   */
  Set (accumulator, input) {
    accumulator.add(input);

    return accumulator;
  },

  /**
   * Sets the input key to equal value on accumulator.
   *
   * @param {Object}
   * @param {array[string, mixed]}
   * @param {Object}
   */
  Object (accumulator, [key, value]) {
    accumulator[key] = value;

    return accumulator;
  }
};
