'use strict';

const iterable = require('../iterable');

module.exports = {
  /**
   * Pushes input into accumulator.
   *
   * @param {mixed}
   * @param {mixed}
   */
  Array (accumulator, input) {
    accumulator.push(input);

    return accumulator;
  },

  /**
   * Sets input key and value on accumulator.
   *
   * @param {mixed}
   * @param {mixed}
   */
  Map (accumulator, [key, value]) {
    accumulator.set(key, value);

    return accumulator;
  },

  /**
   * Sets the input key to equal value on accumulator.
   *
   * @param {mixed}
   * @param {mixed}
   */
  'Object': function (accumulator, [key, value]) {
    accumulator[key] = value;

    return accumulator;
  }
};
