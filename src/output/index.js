'use strict';

const Type = require('../type'),
      Helper = require('../helper');

/**
 * Generates an output factory given an initializers object.
 *
 * @param {object} initializers
 * @return {function}
 */
function from(initializers) {
  const factory = Helper.factoryFor(initializers, {
    error (key) {
      return `Cannot determine the output to create for type ${key}.`;
    }
  });

  return output => {
    return factory(Type.string(output));
  };
}

module.exports = {
  from
};
