'use strict';

const functional = require('./functional');

const _toString = ({}).toString;

/**
 * Given an object its type is returned.
 *
 * @param {mixed} object
 * @return {string} object - the type of object
 */
function string(object) {
  const type = _toString.call(object).slice(8, -1);

  if ((object === null) || (object === undefined)) {
    return type.toLowerCase();
  }

  const constructor = object.constructor;

  if (constructor) {
    return constructor.name;
  } else {
    return type;
  }
}

/**
 * Determine if two objects have the same type.
 *
 * @param {mixed} left
 * @param {mixed} right
 * @return {boolean}
 */
function areSame(left, right) {
  return (string(left) === string(right));
}

/**
 * Determine if two objects have different types.
 *
 * @param {mixed} left
 * @param {mixed} right
 * @return {boolean}
 */
const differ = functional.negate(areSame);

module.exports = {
  string,
  areSame,
  differ
};
