'use strict';

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

module.exports = {
  string
};
