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

// TODO: unit-test
function keyBetween(from, into) {
  return `${type.string(from)}.${type.string(into)}`;
}

// TODO: unit-test
/**
 * Given a collection a build reducer for that type is returned.
 *
 * @param {mixed}
 * @return {mixed}
 */
function between(from, into) {
  return factory(keyBetween(from, into));
}

// TODO: unit-test
function exists(from, into) {
  return lodash.has(reducer, keyBetween(from, into));
}

module.exports = {
  between,
  keyBetween,
  exists
};
