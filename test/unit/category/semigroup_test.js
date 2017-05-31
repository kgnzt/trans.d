'use strict';

const should = require('should');

describe('category/semigroup', () => {
  const semigroup = require('../../../src/category/semigroup'),
        { concat,
          extractSet } = semigroup,
        { compose } = require('../../../src/functional');

  describe('Interface', () => {
    const { Interface } = semigroup;

    it('defines concat', () => {
      Interface.should.have.property('concat');
    });

    it('defines set', () => {
      Interface.should.have.property('set');
    });
  });

  describe('Addition', () => {
    const { Addition } = semigroup;

    it('constructs correctly', () => {
      const semigroup = Addition(5);

      extractSet(semigroup).should.eql(5);
    });

    it('need to test laws', () => {
      const add5 = Addition(5),
            add7 = Addition(7);

      extractSet(concat(add5, add7)).should.eql(12);
    });
  });
  describe('Subtraction', () => {
    const { Subtraction } = semigroup;

    it('constructs correctly', () => {
      const semigroup = Subtraction(5);

      extractSet(semigroup).should.eql(5);
    });

    it('need to test laws', () => {
      const minus5 = Subtraction(5),
            minus7 = Subtraction(7);

      extractSet(concat(minus5, minus7)).should.eql(-2);
    });
  });
});
