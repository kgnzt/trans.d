'use strict';

// @todo remove lodash dep
const lodash   = require('lodash'),
      API      = require('./transducer/api'),
      Type     = require('./type'),
      Step     = require('./step'),
      Input    = require('./input'),
      Output   = require('./output'),
      Iterable = require('./iterable');

const Remap = require('./step/reducer/remap'),
      Adjuster = require('./input/adjuster'),
      Initializer = require('./output/initializer');

function gather(options, item) {
  return lodash.reduce(options, (accumulator, config, type) => {
    if (item in config) {  
      accumulator[type] = config[item];
    }

    return accumulator;
  }, {});
}

function typeOptions(adjusters, remaps, initializers) {
  const result = {};

  lodash.reduce(remaps, (accumulator, subtype, type) => {
    if (!(type in accumulator)) {
      accumulator[type] = {};
    }

    accumulator[type].step = subtype;

    return accumulator;
  }, result);

  lodash.reduce(adjusters, (accumulator, adjuster, type) => {
    if (!(type in accumulator)) {
      accumulator[type] = {};
    }

    accumulator[type].input = adjuster;
    return accumulator;
  }, result);

  lodash.reduce(initializers, (accumulator, initializer, type) => {
    if (!(type in accumulator)) {
      accumulator[type] = {};
    }

    accumulator[type].output = initializer;
    return accumulator;
  }, result);

  return result;
}

/**
 * TODO: try and add a generic output (new value)
 */
const DEFAULT_OPTIONS = {
  type: typeOptions(Adjuster, Remap, Initializer)
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

  return API.unwrap(state);
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
 * Generates transduce, into, and sequence functions using options passed.
 *
 * @param {object} options
 * @return {object} result
 * @return {object} result.transduce
 * @return {object} result.into
 * @return {object} result.sequence
 */
function defaults(options = {}) {
  options = Object.assign({}, options, DEFAULT_OPTIONS);

  const adjust = Input.adjust(gather(options.type, 'input')),
        between = Step.between(gather(options.type, 'step')),
        from = Output.from(gather(options.type, 'output'));

  const transduce = _transduce(adjust),
        into = _into(between, transduce),
        sequence = _sequence(from, into);

  return { transduce, into, sequence };
}

module.exports = Object.assign({
  defaults
}, defaults({}));
