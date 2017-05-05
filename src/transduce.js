'use strict';

const lodash = require('lodash'),
      reducing = require('./reducing'),
      type = require('./type'),
      functional = require('./functional');

const objectToBuild = (function() {
  const TypeToBuild = {
    Array: reducing.array,
    Map: reducing.map
  };

  return (object) => {
    const key = type.string(object);
  
    if (!key in TypeToBuild) {
      throw new TypeError(`No known into reducer for type: ${key}.`);
    }
  
    return TypeToBuild[key];
  }
})();

/**
 */
function transduce(transform, reducer, initial, iterator) {
  return functional.accumulate(transform(reducer), initial, iterator);
}

/**
 * @param {transducer}
 */
function into(transform, collection, iterator) {
  const build = objectToBuild(collection);

  return transduce(transform, build, collection, iterator);
}

/**
 * Callback for performing transducer work.
 *
 * @callback transduction
 * @param {function} iteratee
 * @param {function} step
 * @param {mixed} accumulator
 * @param {array[mixed]} inputs
 */

/**
 * Creates a transducer.
 *
 * @param {function}
 * @param {function} 
 */
/*
function transducer(transduction) {
  return transform => {
    return step => { // what is step doing, its the reducing i/o func?
      return (accumulator, ...inputs) => {
        return transduction(transform, step, accumulator, ...inputs);
      };
    };
  };
};
*/

/**
 * Create a transducer.
 *
 * @param {function}
 * @param {function} 
 */
function _transducer(transduction, transform, step, accumulator, ...inputs) {
  return transduction(transform, step, accumulator, ...inputs);
};

const transducer = lodash.curry(_transducer);

module.exports = {
  transducer,
  into
};
