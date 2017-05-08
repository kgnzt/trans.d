'use strict';

const functional = require('../functional');

/**
 * Uses the iteration number as the object key for value.
 *
 * @param {number}
 * @param {object}
 * @param {mixed}
 * @return {object}
 */
function mapIterationToObjectKey(iteration, accumulator, value) {
  accumulator[iteration] = value;

  return accumulator;
}

/**
 * Uses the iteration number as the object key for value.
 *
 * @param {number}
 * @param {object}
 * @param {mixed}
 * @return {object}
 */
function mapIterationToMapKey(iteration, accumulator, value) {
  accumulator.set(iteration, value);

  return accumulator;
}

module.exports = {
  Array: {
    /**
     * Array -> Object.
     */
    Object () {
      return functional.counter(mapIterationToObjectKey);
    },

    /**
     * Array -> Map.
     */
    Map () {
      return functional.counter(mapIterationToMapKey);
    }
  },

  Set: {
    /**
     * Set -> Object.
     */
    Object () {
      return functional.counter(mapIterationToObjectKey);
    },

    /**
     * Set -> Map.
     */
    Map () {
      return functional.counter(mapIterationToMapKey);
    }
  }
};
