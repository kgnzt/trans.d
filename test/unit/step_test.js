'use strict';

const should = require('should');

describe('remap', () => {
  const remap = require('../../src/step');

  describe('keyBetween', () => {
    const { keyBetween } = remap;

    it('returns a remap key for factory lookup', () => {
      const from = [],
            to = {};

      const result = keyBetween(from, to);

      result.should.eql('Array.Object');
    });

    it('returns a remap key for factory lookup (map, object)', () => {
      const from = new Map(),
            to = {};

      const result = keyBetween(from, to);

      result.should.eql('Map.Object');
    });
  });
});
