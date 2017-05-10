'use strict';

const Type     = require('./type'),
      Step     = require('./step'),
      Iterable = require('./iterable');

/**
 * TODO: try and add a generic output (new value)
 */
const options = {
  type: {
    WeakMap: {
      input (map) {
        return {
          [Symbol.iterator]: function* () { 
            for (let [key, value] of map) {
              yield value;
            }
          }
        };
      },
      step (accumulator, value, key) {
        accumulator.set(value, key);

        return accumulator;
      },
      output () {
        return new WeakMap();
      }
    }
  }
};

/**
 * Iterates using an iterable updating state with each result.
 *
 * @param {function} reducer
 * @param {mixed} accumulator
 * @param {Iterable} iterable
 */
function _reduce(reducer, state, iterable) {
  for (let input of iterable) {
    state = reducer(state, ...(Iterable.spreadable(input)));
  }

  return state;
}

/**
 * Generates a transduce function with an iterator factory.
 *
 * @param {function} iterator
 * @return {function}
 */
function _transduce(iterator) {
  return (transform, step, output, input) => {
    return _reduce(transform(step), output, iterator(input));
  };
}

/**
 * Generates an into function using a step factory and transduce function.
 *
 * @param {function} between
 * @param {function} transduce
 * @return {function}
 */
function _into(between, transduce) {
  return (transform, output, input) => {
    return transduce(transform, between(input, output), output, input);
  };
}

/**
 * Generates a sequence function using an output factory and an into function.
 *
 * @param {function} from
 * @param {function} into
 * @return {function}
 */
function _sequence(from, into) {
  return (transform, input) => {
    return into(transform, from(input), input);
  };
}

/**
 * Applies transform to each each element in input and runs the result
 * through the step passing the current output as the accumulator and 
 * the transformed element as input.
 *
 * @param {function} transform
 * @param {function} step
 * @param {Iterable} output
 * @param {Iterable} input
 * @return {Iterable}
 */
const transduce = _transduce(Iterable.iterator);

/**
 * Applies transform to each each element in input and appends it
 * to output (collection).
 *
 * @param {function} transform
 * @param {Iterable} output
 * @param {Iterable} input
 * @return {Iterable}
 */
const into = _into(Step.between, transduce);

/**
 * Applies transform to each each element in input and appends it
 * to a new output of the same kind as input.
 *
 * @param {function} transform
 * @param {Iterable} input
 * @return {Iterable}
 */
const sequence = _sequence(Iterable.from, into);

/**
 * Generates transduce, into, and sequence functions using options passed.
 *
 * @param {object} options
 * @return {object} result
 * @return {object} result.transduce
 * @return {object} result.into
 * @return {object} result.sequence
 */
function defaults(options = {}) {
  /*
  options = Object.assign({}, options);
  // create iterator
  // create between
  // create from

  const trands = _transduce(iterator),
        intor = _into(between, transduce),
        seq = _sequence(from, into);

  return { transduce, into, sequence };
  */
}

module.exports = {
  defaults,
  into,
  sequence,
  transduce
};
