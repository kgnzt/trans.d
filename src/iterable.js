'use strict';

const type = require('./type'),
      argument = require('./argument'),
      helper = require('./helper');

const IteratorMapping = {
  /**
   * Generates an iterable Map.
   *
   * @param {object} map
   * @return {object}
   */
  Map (map) {
    return {
      [Symbol.iterator]: function* () { 
        for (let [key, value] of map) {
          yield new argument.Tuple([value, key]);
        }
      }
    };
  },

  /**
   * Generates an iterable object.
   *
   * @param {object} object
   * @return {object}
   */
  Object (object) {
    return {
      [Symbol.iterator]: function* () { 
        for (let key in object) { 
          yield new argument.Tuple([object[key], key]);
        } 
      }
    };
  }
};

/**
 * Given a type a new empty Iterable of the same kind is returned.
 *
 * @param {string}
 * @return {Iterable}
 */
const iteratorFactory = helper.createFactory(IteratorMapping, {
  create (create, object) {
    return create(object);
  },
  error (key) {
    return `Cannot create the iterator for collection type ${key}.`;
  }
});

// todo: test
function shouldOverride (type) {
  if (type === 'Map') {
    return true;
  }

  return false;
}

/**
 * Returns an iterable form of object.
 *
 * TODO: unit-test
 *
 * @param {mixed}
 * @throw {TypeError} // TODO:
 * @return {Iterable}
 */
function iterator(object) {
  if (isIterable(object) && !shouldOverride(type.string(object))) {
    return object;
  }

  return iteratorFactory(type.string(object), object);
}

/**
 * Determine if an object is iterable.
 *
 * @param {string}
 * @param {object}
 * @return {string}
 */
function isIterable(object) {
  if (object === null) {
    return false;
  }

  return (typeof object[Symbol.iterator] === 'function');
}

/**
 * Type to new Iterable mapping.
 */
const Mapping = {
  Array () {
    return [];
  },
  Map () {
    return new Map();
  },
  Object () {
    return {};
  },
  Set () {
    return new Set();
  }
};

/**
 * Given a type a new empty Iterable of the same kind is returned.
 *
 * @param {string}
 * @return {Iterable}
 */
const factory = helper.createFactory(Mapping, {
  error (key) {
    return `Cannot determine the iterator to create for type ${key}.`;
  }
});

/**
 * Given an Iterable a new empty Iterable of the same kind is returned.
 *
 * @param {Iterable}
 * @return {Iterable}
 */
function from(iterator) {
  return factory(type.string(iterator));
}

module.exports = {
  from,
  isIterable,
  iterator
};
