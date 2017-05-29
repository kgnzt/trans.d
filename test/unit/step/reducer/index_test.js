'use strict';

const should = require('should');

describe('reducing', () => {
  const reducing = require('../../../../src/step/reducer');

  describe('identity', () => {
    const { identity } = reducing;

    it('returns the input value', () => {
      const accumulator = 'alpha',
            input = 'beta';

      const result = identity(accumulator, input);

      result.should.eql(input);
    });
  });

  describe('func', () => {
    const { func } = reducing;

    it('calls the input with the accumulator', () => {
      const accumulator = 10,
            input = (x) => {
              return x + 3;
            };

      const result = func(accumulator, input);

      result.should.eql(13);
    });
  });

  describe('sum', () => {
    const { sum } = reducing;

    it('correctly adds input a and b', () => {
      const a = 9,
            b = 2;

      const result = sum(a, b);

      result.should.eql(11);
    });
  });

  describe('product', () => {
    const { product } = reducing;

    it('correctly multiplies input a and b', () => {
      const a = 9,
            b = 2;

      const result = product(a, b);

      result.should.eql(18);
    });
  });
});
