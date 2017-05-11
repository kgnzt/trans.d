'use strict';

const Type = require('../type'),
      Helper = require('../helper'),
      Iterable = require('../iterable');

/**
 * Determine if an iterable object should be overridden with a new
 * iterable object.
 *
 * TODO: this is not configuable.
 */
function _shouldOverride (type) {
  if (type === 'Map') {
    return true;
  }

  return false;
}

/**
 * Generates an input adjuster given an adjusters object.
 *
 * @param {object} initializers
 * @return {function}
 */
function adjust(adjusters) {
  const factory = Helper.factoryFor(adjusters, {
    create (create, object) {
      return create(object);
    },
    error (key) {
      return `Cannot adjust or make input iterable for type ${key}.`;
    }
  });

  return input => {
    if (Iterable.isIterable(input) && 
      !_shouldOverride(Type.string(input))
    ) {
      return input;
    }
  
    return factory(Type.string(input), input);
  };
}

module.exports = {
  adjust
};
