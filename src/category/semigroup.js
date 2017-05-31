'use strict';

/**
 * Semigroup interface.
 */
const Interface = {
  set: Symbol('set'),
  concat: Symbol('concat')
};

/**
 * Addition semigroup.
 *
 * @param {mixed}
 * @return {object}
 */
function Addition(set) {
  return {
    [Interface.set]: set,
    [Interface.concat]: right => {
      return new Addition(set + extractSet(right));
    }
  };
}

/**
 * Subtraction semigroup.
 *
 * @param {mixed}
 * @return {object}
 */
function Subtraction(set) {
  return {
    [Interface.set]: set,
    [Interface.concat]: right => {
      return new Subtraction(set - extractSet(right));
    }
  };
}

function concat(left, right) {
  return left[Interface.concat](right);
}

function extractSet(semigroup) {
  return semigroup[Interface.set];
}

module.exports = {
  Addition,
  Interface,
  Subtraction,
  concat,
  extractSet
};
