'use strict';

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

module.exports = {
  InputTuple,
  isInputTuple,
  isIterable,
  spreadable
};
