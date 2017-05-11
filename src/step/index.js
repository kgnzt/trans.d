'use strict';

const Type    = require('../type'),
      lodash  = require('lodash'),
      Helper  = require('../helper');

/**
 * Given two objects, a step key is returned.
 *
 * @param {mixed} input
 * @param {mixed} output
 * @return {string}
 */
function keyBetween(input, output) {
  return `${Type.string(input)}.${Type.string(output)}`;
}

/**
 * Determine if a remap reducer between two types exists.
 *
 * TODO: unit-test
 *
 * @param {mixed} from
 * @param {mixed} into
 * @return {boolean}
 */
function existsFor(steps) {
  return (input, output) => {
    return lodash.has(steps, keyBetween(input, output));
  }
}

/**
 * Generates a step factory using step definitions.
 *
 * TODO: unit-test
 *
 * @param {object} steps
 * @return {function}
 */
function between(steps) {
  const factory = Helper.factoryFor(steps, {
    error (key) {
      return `Cannot determine the step reducer to use for ${key}.`;
    }
  });
  const exists = existsFor(steps);

  /**
   * Given an input and output, a step reducer is returned.
   *
   * @param {mixed} input
   * @param {mixed} output
   * @return {function}
   */
  return (input, output) => {
    let key = keyBetween(output, output);
  
    if (Type.differ(input, output)) {
      if (exists(input, output)) {
        key = keyBetween(input, output);
      }
    }
  
    return factory(key);
  }
}

module.exports = {
  between,
  keyBetween
};
