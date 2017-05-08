'use strict';

module.exports = {
  /**
   * Pushes input into accumulator.
   *
   * @param {Array}
   * @param {mixed}
   * @return {Array}
   */
  Array (accumulator, input) {
    accumulator.push(input);

    return accumulator;
  },

  /**
   * Sets input key and value on accumulator.
   *
   * @param {Map}
   * @param {mixed}
   * @param {string}
   * @return {Map}
   */
  Map (accumulator, value, key) {
    accumulator.set(key, value);

    return accumulator;
  },

  /**
   * Adds input to accumulator.
   *
   * @param {Set}
   * @param {mixed}
   * @return {Set}
   */
  Set (accumulator, input) {
    accumulator.add(input);

    return accumulator;
  },

  /**
   * Sets the input key to equal value on accumulator.
   *
   * @param {Object}
   * @param {mixed}
   * @param {string}
   * @return {Object}
   */
  Object (accumulator, value, key) {
    accumulator[key] = value;

    return accumulator;
  }
};
