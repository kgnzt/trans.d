'use strict';

const buildReducer = require('./reducer/build'),
      type = require('./type'),
      helper = require('./helper');

/**
 * Given a type a build reducer for that type is returned.
 *
 * @param {string}
 * @return {Iterable}
 */
const factory = helper.createFactory(buildReducer, {
  create (build) {
    return build;
  },
  error (key) {
    return `Cannot determine the build reducer to use for type ${key}.`;
  }
});

/**
 * Given a collection a build reducer for that type is returned.
 *
 * @param {mixed}
 * @return {mixed}
 */
function _for(collection) {
  return factory(type.string(collection));
}

module.exports = {
  for: _for
};
