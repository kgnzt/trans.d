'use strict';

const reducer = require('./reducer/remap'),
      type = require('./type'),
      lodash = require('lodash'),
      helper = require('./helper');

/**
 * Given a type a build reducer for that type is returned.
 *
 * @param {string}
 * @return {Iterable}
 */
const factory = helper.createFactory(reducer, {
  error (key) {
    return `Cannot determine the remap reducer to use for ${key}.`;
  }
});

/**
 * Given two objects, a remap lookup key is returned.
 *
 * @param {mixed} from
 * @param {mixed} into
 * @return {string}
 */
function keyBetween(from, into) {
  return `${type.string(from)}.${type.string(into)}`;
}

/**
 * Given a collection a build reducer for that type is returned.
 *
 * TODO: unit-test
 *
 * @param {mixed} from
 * @param {mixed} into
 * @return {function}
 */
function between(from, into) {
  return factory(keyBetween(from, into));
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
  return lodash.has(reducer, keyBetween(from, into));
}

module.exports = {
  between,
  keyBetween,
  exists
};
