'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('iterable', () => {
  const build = require('../../src/build');

  describe('for', () => {
    it('throws with unknown type', () => {
      class ZooZoo {};

      (function () {
        build.for(new ZooZoo());
      }).should.throw('Cannot determine the build reducer to use for type ZooZoo.');
    });

    it('returns a valid array build reducer', () => {
      const collection = [],
            accumulator = [],
            input = 13;

      const reducer = build.for(collection);

      const result = reducer(accumulator, input);

      result.should.eql([13]);
    });

    it('handles an Object', () => {
    });

    it('handles a Map', () => {
    });

    it('handles a Set', () => {
    });
  });
});
