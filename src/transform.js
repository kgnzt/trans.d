'use strict';

const transducer = require('./transducer');

/**
 * Remove odd inputs.
 */
const removeOdd = transducer.filter(x => (x % 2) === 0);

/**
 * Remove even inputs.
 */
const removeEven = transducer.filter(x => (x % 2) !== 0);

module.exports = {
  removeOdd,
  removeEven
};
