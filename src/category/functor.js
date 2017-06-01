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
 *
 * @param {mixed}
 * @return {object}
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
 *
 * @param {mixed}
 * @return {object}
 */
function Constant(value) {
  return {
    [Interface.value]: value,
    [Interface.map]: function(morphism) {
      return Constant(value);
    }
  };
}

/**
 * Determines if the passed object is a functor.
 *
 * @param {mixed}
 * @return {boolean}
 */
function isFunctor(functor) {
  return (Interface.value in functor && Interface.map in functor);
}

module.exports = {
  Constant,
  Identity,
  Interface,
  extractValue,
  isFunctor,
  map
};
