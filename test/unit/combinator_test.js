'use strict';

const should = require('should');

describe('combinator', () => {
  const combinator = require('../../src/combinator');

  describe('S', () => {
    const { S } = combinator;

    it('correctly performs substitution', () => {
      const x = a => b => a + b,
            y = b => b,
            z = 1;

      const result = S(x, y, z);

      result.should.eql(2);
    });
  });

  describe('K', () => {
    const { K } = combinator;

    it('returns a function that returns value passed', () => {
      const result = K(10);

      result.should.be.a.Function();

      const value = result();

      value.should.eql(10);
    });
  });

  describe('I', () => {
    const { I } = combinator;

    it('returns result of value passed', () => {
      const result = I(10);

      result.should.eql(10);
    });
  });
});
