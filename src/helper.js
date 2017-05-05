'use strict';

const functional = require('./functional');

/**
 * Generates an object / key based factory.
 *
 * @param {string}
 * @param {object}
 * @return {string}
 */
function createFactory(
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
    if (!(key in object)) {
      throw new TypeError(options.error(key, object));
    }
  
    return options.create(object[key], ...args);
  }
}

module.exports = {
  createFactory
};
