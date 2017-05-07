'use strict';

const lodash = require('lodash'),
      argument = require('./argument'),
      functional = require('./functional');

/**
 * Create a transducer.
 *
 * @param {function}
 * @param {function} 
 */
function _transducer(transduction, transform, reducer, accumulator, ...inputs) {
  return transduction(transform, reducer, accumulator, ...inputs);
}

const transducer = lodash.curry(_transducer);

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
const filter = transducer((predicate, build, accumulator, input) => {
  console.log(accumulator);
  if (argument.isTuple(input)) {
    console.log(input);
    value = predicate(...input);
    return value ? build(accumulator, value, ...input.rest) : accumulator;
  } else {
    return predicate(input) ? build(accumulator, input) : accumulator;
  }
});

/**
 * @param {function} iteratee
 * @param {function} build
 * @return {function}
 */
const map = transducer((iteratee, build, accumulator, input) => {
  console.log(accumulator);
  if (argument.isTuple(input)) {
    return build(accumulator, iteratee(...input), ...input.rest);
  } else {
    return build(accumulator, iteratee(...input));
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
