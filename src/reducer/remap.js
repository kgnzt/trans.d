'use strict';

const functional = require('../functional');

module.exports = {
  Array: {
    /**
     * Array -> Object.
     */
    Object () {
      /**
       * Remap an Array into an Object.
       *
       * @param {object}
       * @param {mixed}
       * @param {number}
       * @return {object}
       */
      return functional.counter((iteration, accumulator, value) => {
        accumulator[iteration] = value;

        return accumulator;
      });
    },

    /**
     * Array -> Map.
     */
    Map () {
      /**
       * Remap an Array into a Map.
       *
       * @param {object}
       * @param {mixed}
       * @param {number}
       * @return {object}
       */
      return functional.counter((iteration, accumulator, value) => {
        accumulator.set(iteration, value);

        return accumulator;
      });
    }
  },

  Set: {
    /**
     * Set -> Object.
     */
    Object () {
      /**
       * Remap a Set into an Object.
       *
       * @param {object}
       * @param {mixed}
       * @param {number}
       * @return {object}
       */
      return functional.counter((iteration, accumulator, value) => {
        accumulator[iteration] = value;

        return accumulator;
      });
    },

    /**
     * Set -> Map.
     */
    Map () {
      /**
       * Remap a Set into a Map.
       *
       * @param {object}
       * @param {mixed}
       * @param {number}
       * @return {object}
       */
      return functional.counter((iteration, accumulator, value) => {
        accumulator.set(iteration, value);

        return accumulator;
      });
    }
  }
};
