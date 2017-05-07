'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('iterable', () => {
  const iterable = require('../../src/iterable');

  describe('iterator', () => {
    const { iterator } = iterable;

    it('works with an object', () => {
      const object = { alpha: 1, beta: 2 };

      const result = iterator(object);

      let iteration = 0;
      for (let value of result) {
        switch (iteration) {
          case 2:
            value.should.eql([1, 'alpha']);
            break;
          case 1:
            value.should.eql([2, 'beta']);
            break;
          default:
            break;
        };

        iteration++;
      }

      iteration.should.eql(2);
    });

    it('produces an inverted argument order iteration for Map', () => {
      const map = new Map();
      map.set('alpha', 1);
      map.set('beta', 2);

      const result = iterator(map);

      let iteration = 0;
      for (let value of result) {
        switch (iteration) {
          case 2:
            value.should.eql([1, 'alpha']);
            break;
          case 1:
            value.should.eql([2, 'beta']);
            break;
          default:
            break;
        };

        iteration++;
      }

      iteration.should.eql(2);
    });
  });

  describe('isIterable', () => {
    const { isIterable } = iterable;

    it('returns true for an object that has iterable protocol', () => {
      const iterable = [];

      const result = isIterable(iterable);

      result.should.eql(true);
    });

    it('works with custom iterable objects', () => {
      const iterable = {
        [Symbol.iterator]: function* () {
          yield 2
        }
      };

      const result = isIterable(iterable);

      result.should.eql(true);
    });

    it('returns false for an object that does not have iterable protocol', () => {
      const iterable = 6;

      const result = isIterable(iterable);

      result.should.eql(false);
    });
  });

  describe('from', () => {
    const { from } = iterable;

    it('throws with unknown type', () => {
      class ZooZoo {};

      (function () {
        from(new ZooZoo());
      }).should.throw('Cannot determine the iterator to create for type ZooZoo.');
    });

    it('handles an Array', () => {
      const iterable = [];

      const result = from(iterable);

      result.should.be.an.Array();
    });

    it('handles an Object', () => {
      const iterable = {};

      const result = from(iterable);

      result.should.be.an.Object();
      result.should.eql({});
    });

    it('handles a Map', () => {
      const iterable = new Map()

      const result = from(iterable);

      result.should.be.an.instanceOf(Map);
    });

    it('handles a Set', () => {
      const iterable = new Set()

      const result = from(iterable);

      result.should.be.an.instanceOf(Set);
    });
  });
});
