'use strict';

/**
 * Given x, y, z return the first applied to the third which is then
 * applied to the result of the second applied to the third.
 *
 * @param {mixed}
 */
function S(x, y, z) {
  return x(z)(y(z));
}

/**
 * Given x return a function that returns x.
 *
 * @param {mixed}
 * @return {function}
 */
function K(x) {
  return y => x;
}

/**
 * Given x return x.
 *
 * @param {mixed}
 * @return {mixed}
 */
function I(x) {
  return x;
}

module.exports = {
  S,
  K,
  I
};
