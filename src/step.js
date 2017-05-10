'use strict';

const Remap = require('./reducer/remap'),
      Type    = require('./type'),
      lodash  = require('lodash'),
      Helper  = require('./helper');

/**
 * Given a type a build reducer for that type is returned.
 *
 * @param {string}
 * @return {Iterable}
 */
const factory = Helper.factoryFor(Remap, {
  error (key) {
    return `Cannot determine the step reducer to use for ${key}.`;
  }
});

/**
 * Given two objects, a step key is returned.
 *
 * @param {mixed} from
 * @param {mixed} into
 * @return {string}
 */
function keyBetween(from, into) {
  const fromType = Type.string(from),
        intoType = Type.string(into);

  return `${Type.string(from)}.${Type.string(into)}`;
}

/**
 * Given a collection a build reducer for that type is returned.
 *
 * TODO: unit-test
 *
 * @param {mixed} input
 * @param {mixed} output
 * @return {function}
 */
function between(input, output) {
  let key = keyBetween(output, output);

  if (Type.differ(input, output)) {
    if (exists(input, output)) {
      key = keyBetween(input, output);
    }
  }

  return factory(key);
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
function exists(from, into) {
  return lodash.has(Remap, keyBetween(from, into));
}

module.exports = {
  between,
  keyBetween,
  exists
};
