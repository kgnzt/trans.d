'use strict';

const functional = require('./functional'),
      lodash = require('lodash');

// TODO: remove lodash dep

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
    create: functional.call,
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
  factoryFor
};
