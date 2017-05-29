'use strict';

const { InputTuple } = require('../iterable');

module.exports = {
  Number (number) {
    return {
      [Symbol.iterator]: function* () { 
        yield number;
      }
    };
  },

  /**
   * Generates an iterable Map.
   *
   * @param {object} map
   * @return {object}
   */
  Map (map) {
    return {
      [Symbol.iterator]: function* () { 
        for (let [key, value] of map) {
          yield new InputTuple(value, key);
        }
      }
    };
  },

  /**
   * Generates an iterable object.
   *
   * @param {object} object
   * @return {object}
   */
  Object (object) {
    return {
      [Symbol.iterator]: function* () { 
        for (let key in object) { 
          yield new InputTuple(object[key], key);
        } 
      }
    };
  }
};
