'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('math', () => {
  const math = require('../../src/math');

  describe('square', () => {
    const { square } = math;

    it('squares the input', () => {
      const result = square(5);

      result.should.eql(25);
    });
  });

  describe('increment', () => {
    const { increment } = math;

    it('adds 1 to the input', () => {
      const result = increment(2);

      result.should.eql(3);
    });
  });

  describe('decrement', () => {
    const { decrement } = math;

    it('subtracts 1 to the input', () => {
      const result = decrement(2);

      result.should.eql(1);
    });
  });

  describe('reciprical', () => {
    const { reciprical } = math;

    it('returns the reciprical of the input', () => {
      const result = reciprical(10);

      result.should.eql(0.1);
    });
  });

  describe('square', () => {
    const { reciprical } = math;

    it('returns the reciprical of the input', () => {
      const result = reciprical(10);

      result.should.eql(0.1);
    });
  });
});
