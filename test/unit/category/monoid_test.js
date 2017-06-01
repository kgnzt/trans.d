'use strict';

const should = require('should');

describe('category/functor', () => {
  const monoid = require('../../../src/category/monoid'),
        { map } = monoid;

  describe('Interface', () => {
    const { Interface } = monoid;

    it('defines map', () => {
      Interface.should.have.property('concat');
    });

    it('defines empty', () => {
      Interface.should.have.property('empty');
    });

    it('defines set', () => {
      Interface.should.have.property('set');
    });
  });

  describe('Arr', () => {
    const { Arr, Interface } = monoid;

    it('', () => {
      const arr = Arr([1, 2, 3]);

      const result = map(x => x + 1, arr);

      result[Interface.set].should.eql([2, 3, 4]);
    });
  });
});
