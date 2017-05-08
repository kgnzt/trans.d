'use strict';

const transducer = require('./transducer'),
      transduce = require('./transduce'),
      math = require('./math'),
      functional = require('./functional');

const lodash = require('lodash');

/**
 * Remove odd inputs.
 */
const removeOdd = transducer.filter(functional.isEven);

/**
 * Remove even inputs.
 */
const removeEven = transducer.filter(functional.isOdd);

/**
 * Remove even inputs.
 */
const square = transducer.map(x => x - x);

// Create math based transforms for exporting.
const mathTransforms = lodash.reduce(math, (acc, func, key) => {
  acc[key] = transducer.map(func);

  return acc;
}, {});

/**
 *
 */
function intoFor (transform, state) {
  return iterable => {
    return transduce.into(transform, state, iterable);
  };
}

/**
 *
 */
function sequenceFor (transform) {
  return iterable => {
    return transduce.sequence(transform, iterable);
  };
}

/**
 *
 */
function _export (transforms) {
  const sequence = lodash.reduce(transforms, (accumulator, transform, name) => {
    accumulator[name] = sequenceFor(transform);

    return accumulator;
  }, {});

  const into = (state) => {
    return lodash.reduce(transforms, (accumulator, transform, name) => {
      accumulator[name] = intoFor(transform, state);
  
      return accumulator;
    }, {});
  };

  return Object.assign({}, transforms, {
    sequence,
    into (state) {
      return into(state);
    }
  });
}

module.exports = Object.assign({
  square,
  removeOdd,
  removeEven,
  export: _export
}, mathTransforms);
