'use strict';

const functional = require('./functional'),
      { transducer } = require('./trd');

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
  let value = null;
  if (Array.isArray(inputs[0])) {
    value = predicate(inputs[0][1], inputs[0][0]);
    return value ? build(accumulator, inputs[0]) : accumulator;
  } else {
    return predicate(...inputs) ? build(accumulator, ...inputs) : accumulator;
  }
});

/**
 * @param {function} iteratee
 * @param {function} build
 * @return {function}
 */
const map = transducer((iteratee, build, accumulator, ...inputs) => {
  let value = null;
  if (Array.isArray(inputs[0])) {
    value = iteratee(...inputs[0]);
    return build(accumulator, [inputs[0][1], value]);
  } else {
    value = iteratee(...inputs);
    return build(accumulator, value);
  }
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
