'use strict';

const Type = require('./type'),
      helper = require('./helper');

/**
 * An iterable tuple is returned from an Iterable when the current iteration
 * value should be spread across as inputs into a reducing function.
 */
class InputTuple {
  /**
   * @param {...object} inputs
   */
  constructor(...inputs) {
    this._inputs = inputs;
  }

  * [Symbol.iterator]() {
    for (let value of this._inputs) {
      yield value;
    }
  }
}

/**
 * Determine if an object is a Tuple.
 *
 * @param {mixed}
 * @return {boolean}
 */
function isInputTuple(object) {
  return (object instanceof InputTuple);
}

/**
 * Ensure that an iterable value is spreadable.
 *
 * @param {mixed}
 * @return {[]...spreadable}
 */
function spreadable(input) {
  if (!isInputTuple(input)) {
    return [input];
  }

  return input;
}

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
          yield new InputTuple(value, key);
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
          yield new InputTuple(object[key], key);
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
const iteratorFactory = helper.factoryFor(IteratorMapping, {
  create (create, object) {
    return create(object);
  },
  error (key) {
    return `Cannot create the iterator for collection type ${key}.`;
  }
});

/**
 * Determine if an iterable object should be overridden with a new
 * iterable object.
 */
function _shouldOverride (type) {
  if (type === 'Map') {
    return true;
  }

  return false;
}

/**
 * Returns an iterable form of object.
 *
 * @param {mixed}
 * @throw {TypeError}
 * @return {Iterable}
 */
function iterator(object) {
  if (isIterable(object) && !_shouldOverride(Type.string(object))) {
    return object;
  }

  return iteratorFactory(Type.string(object), object);
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
const factory = helper.factoryFor(Mapping, {
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
  return factory(Type.string(iterator));
}

module.exports = {
  InputTuple,
  spreadable,
  isInputTuple,
  from,
  isIterable,
  iterator
};
