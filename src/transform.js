'use strict';

const transducer = require('./transducer'),
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

module.exports = Object.assign({
  square,
  removeOdd,
  removeEven
}, mathTransforms);
