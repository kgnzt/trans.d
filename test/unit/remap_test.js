'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('remap', () => {
  const remap = require('../../src/remap');

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

    it('returns only the type when from and into are equal', () => {
      const from = new Map(),
            to = new Map();

      const result = keyBetween(from, to);

      result.should.eql('Map');
    });
  });
});
