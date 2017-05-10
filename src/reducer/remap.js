'use strict';

const Functional = require('../functional'),
      Build = require('./build');

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
     * Array -> Array
     */
    Array () {
      return Build.Array;
    },

    /**
     * Array -> Object.
     */
    Object () {
      return Functional.counter(mapIterationToObjectKey);
    },

    /**
     * Array -> Map.
     */
    Map () {
      return Functional.counter(mapIterationToMapKey);
    }
  },

  Map: {
    /**
     * Map -> Map.
     */
    Map () {
      return Build.Map;
    }
  },

  Object:  {
    /**
     * Object -> Object.
     */
    Object () {
      return Build.Object;
    }
  },

  Set: {
    /**
     * Set -> Set.
     */
    Set () {
      return Build.Set;
    },

    /**
     * Set -> Object.
     */
    Object () {
      return Functional.counter(mapIterationToObjectKey);
    },

    /**
     * Set -> Map.
     */
    Map () {
      return Functional.counter(mapIterationToMapKey);
    }
  },

  String: {
    /**
     * String -> String.
     */
    String () {
      return Build.String;
    },

    /**
     * String -> Array.
     */
    Array () {
      return Build.Array;
    },

    /**
     * String -> Object.
     */
    Object () {
      return Functional.counter(mapIterationToObjectKey);
    },

    /**
     * String -> Map.
     */
    Map () {
      return Functional.counter(mapIterationToMapKey);
    }
  }
};
