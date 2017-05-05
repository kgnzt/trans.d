'use strict';

const type = require('./type'),
      helper = require('./helper');

const IteratorMapping = {
  Map (map) {
    return {
      // think about ordering here.
      // maybe enforece alphabetical?
      [Symbol.iterator]: function* () { 
        for (let [key, value] in map) {
          yield [value, key];
        }
      }
    };
  },
  Object (object) {
    return {
      // think about ordering here.
      // maybe enforece alphabetical?
      [Symbol.iterator]: function* () { 
        for (let key in object) { 
          yield [object[key], key];
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
};

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
  if (object == null) {
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
 * Given an  object an iterator for it is returned.
 *
 * @param {Iterable}
 * @return {Iterable}
 */
function _for(object) {
  return makeIterator(object);
}

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
  for: _for,
  from,
  isIterable,
  iterator
};
