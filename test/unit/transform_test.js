'use strict';

const should = require('should');

describe('transform', () => {
  const transform = require('../../src/transform');

  function build (accumulator, input) {
    accumulator.push(input);

    return accumulator;
  }

  let iterable = null,
      accumulator = null;
  beforeEach(() => {
    accumulator = [];
    iterable = [1, 2, 5];
  });

  describe('removeOdd', () => {
    const { removeOdd } = transform;

    it('correctly removes odds', () => {
      const result = removeOdd(build)(accumulator, 3);

      result.should.eql([]);
    });
  });

  describe('removeEven', () => {
    const { removeEven } = transform;

    it('correctly removes odds', () => {
      const result = removeEven(build)(accumulator, 2);

      result.should.eql([]);
    });
  });

  describe('sqaure', () => {
    const { square } = transform;

    it('correctly squares the input', () => {
      const result = square(build)(accumulator, 5);

      result.should.eql([25]);
    });
  });

  describe('math exports', () => {
    it('exports math transforms', () => {
      [
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
      ].forEach(property => {
        transform.should.have.property(property);
      });
    });
  });
});
