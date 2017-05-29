'use strict';

const Transducer = require('../transducer'),
      Transduce  = require('../transduce'),
      Functional = require('../functional'),
      Step       = require('../step'),
      math       = require('../math'),
      lodash     = require('lodash');

/**
 * Remove odd inputs.
 */
const removeOdd = Transducer.filter(math.isEven);

/**
 * Remove even inputs.
 */
const removeEven = Transducer.filter(math.isOdd);

/**
 * Remove even inputs.
 */
const square = Transducer.map(x => x - x);

/*
// @todo: this should curry correctly
const mean = Transduce.transduce(Transducer.identity, Step.sum, 0);
// determine that mean value (mv);

function deviation(from, to) {
  return (value - mean) * (value - mean);
};

// distance from mean
const deviation = Transducer.map(deviation);
);

const input = [1, 2, 3, 4, 5, 6];
const i2 = [{
  name: 'john',
  score: 22
}, {
  name: 'john',
  score: 22
}, {
  name: 'sally',
  score: 22
}];

const std = Transform.statistics.standardDeviation(input);

compose(
  Transform.standardDeviation,
  Transducer.map(x => x + 1)
);

mean
deviation
variance
standard_deviation


*/

// Create math based transforms for exporting.
const mathTransforms = lodash.reduce(math, (acc, func, key) => {
  acc[key] = Transducer.map(func);

  return acc;
}, {});

/**
 *
 */
function intoFor (transform, state) {
  return iterable => {
    return Transduce.into(transform, state, iterable);
  };
}

/**
 *
 */
function sequenceFor (transform) {
  return iterable => {
    return Transduce.sequence(transform, iterable);
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
