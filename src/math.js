'use strict';

const lodash = require('lodash');

/**
 * Square the input.
 *
 * @param {number} input
 * @return {boolean}
 */
function square (x) { return (x * x); }

/**
 * Add 1 to the input.
 *
 * @param {number} input
 * @return {boolean}
 */
function increment (x) { return (x + 1); }

/**
 * Substracts 1 from the input.
 *
 * @param {number} input
 * @return {boolean}
 */
function decrement (x) { return (x - 1); }

/**
 * Takes the reciprical of the input.
 *
 * @param {number} input
 * @return {boolean}
 */
function reciprical (x) { return (1 / x); }

const imports = lodash.pick(Math, [
  'abs',
  'acos',
  'acosh',
  'asin',
  'asinh',
  'atan',
  'atanh',
  'atan2',
  'cbrt',
  'ceil',
  'clz32',
  'cos',
  'cosh',
  'exp',
  'expm1',
  'floor',
  'fround',
  'hypot',
  'imul',
  'log',
  'log1p',
  'log10',
  'max',
  'min',
  'pow',
  'random',
  'round',
  'sign',
  'sin',
  'sinh',
  'sqrt',
  'tanh',
  'trunc'
]);

module.exports = Object.assign({
  square,
  increment,
  reciprical,
  decrement,
}, imports);
