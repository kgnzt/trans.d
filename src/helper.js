'use strict';

// @todo remove lodash dep
const Functional = require('./functional'),
      lodash = require('lodash');

// @todo unit-test
function swap(array, i1, i2) {
  const result = Array.from(array);

  const temp = array[i1];

  result[i1] = array[i2];
  result[i2] = temp;

  return result;
}

// @todo unit-test
function swapAdjust(array, i1, i2, iteratee) {
  array = swap(array, i1, i2);
  array[i1] = iteratee(...array);

  return swap(array, i1, i2);
}

/**
 * Generates an object / key based factory.
 *
 * @param {string}
 * @param {object}
 * @return {string}
 */
function factoryFor(
  object,
  options = {}
) {
  options = Object.assign({}, {
    create: Functional.call, // default create identity
    error (key) {
      return `Could not find ${key} in factory object.`;
    }
  }, options);

  // tODO: unit-test arg forwarding
  return (key, ...args) => {
    if (!(lodash.has(object, key))) {
      throw new TypeError(options.error(key, object));
    }
  
    return options.create(lodash.get(object, key), ...args);
  };
}

module.exports = {
  factoryFor,
  swap,
  swapAdjust
};
