'use strict';

const Semigroup = require('./semigroup'),
      Functional = require('../functional');

/**
 * Monoid interface.
 */
const Interface = Object.assign({
  empty: Symbol('empty')
}, Semigroup.Interface);

function Arr(set) {
  return {
    [Interface.set]: set,
    [Interface.concat]: right => {
      return new Arr(set.concat(right));
    },
    [Interface.empty]: () => {
      return new Arr([]);
    }
  };
};

function map(morphism, domain) {
  return Functional.reduce((codomain, input) => {
    return codomain[Semigroup.Interface.concat](morphism(input));
  }, domain[Interface.empty](), domain[Interface.set]);
}

module.exports = {
  map,
  Interface,
  Arr
};
