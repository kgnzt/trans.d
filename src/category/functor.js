'use strict';

const Functional = require('../functional');

/**
 * Functor interface.
 */
const Interface = {
  map: Symbol('map'),
  value: Symbol('value')
};

/**
 * Functor map.
 *
 * @param {function}
 * @param {Functor}
 * @return {function}
 */
const map = Functional.curry((morphism, functor) => {
  return functor[Interface.map](morphism);
});

/**
 * Return functor value.
 *
 * @param {object}
 * @return {mixed}
 */
function extractValue(functor) {
  return functor[Interface.value];
}

/**
 * Identity functor.
 */
function Identity(value) {
  return {
    [Interface.value]: value,
    [Interface.map]: function(morphism) {
      return Identity(morphism(value));
    }
  };
}

/**
 * Constant functor.
 */
function Constant(value) {
  return {
    [Interface.value]: value,
    [Interface.map]: function(morphism) {
      return Constant(value);
    }
  };
}

module.exports = {
  Constant,
  Identity,
  Interface,
  extractValue,
  map
};
