'use strict';

const functional = require('./functional'),
      { transducer } = require('./transduce');

/**
 * Includes the first N inputs.
 *
 * TODO: curry?
 *
 * @param {number} count
 * @return {function}
 */
function take(count) {
  return build => {
    return functional.counter((iteration, accumulator, input) => {
      return (iteration >= count) ? accumulator : build(accumulator, input);
    });
  };
}

/**
 * Removes the first N inputs.
 *
 * TODO: curry?
 *
 * @param {number} count
 * @return {function}
 */
function drop(count) {
  return build => {
    return functional.counter((iteration, accumulator, input) => {
      return (iteration < count) ? accumulator : build(accumulator, input);
    });
  };
}

/**
 * @param {function} predicate
 * @param {function} build
 * @return {function}
 */
const filter = transducer((predicate, build, accumulator, ...inputs) => {
  return predicate(...inputs) ? build(accumulator, ...inputs) : accumulator;
});

/**
 * @param {function} iteratee
 * @param {function} build
 * @return {function}
 */
const map = transducer((iteratee, build, accumulator, ...inputs) => {
  return build(accumulator, iteratee(...inputs));
});

/**
 * @param {function} predicate
 * @param {function} build
 * @return {function}
 */
const remove = transducer((predicate, build, accumulator, ...inputs) => {
  return predicate(...inputs) ? accumulator : build(accumulator, ...inputs);
});

module.exports = {
  drop,
  filter,
  identity: functional.identity,
  map,
  negate: functional.negate,
  remove,
  take
};
