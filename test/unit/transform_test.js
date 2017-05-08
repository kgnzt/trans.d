'use strict';

const should = require('should'),
      sinon = require('sinon');

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
});
