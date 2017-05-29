'use strict';

const should = require('should');

describe('output/initializer', () => {
  const Initializer = require('../../../src/output/initializer');

  describe('Array', () => {
    it('returns an empty array', () => {
      const result = Initializer.Array();

      result.should.eql([]);
    });
  });

  describe('Map', () => {
    it('returns an empty map', () => {
      const result = Initializer.Map();

      result.should.eql(new Map());
    });
  });

  describe('Number', () => {
    it('returns 0', () => {
      const result = Initializer.Number();

      result.should.eql(0);
    });
  });

  describe('Object', () => {
    it('returns an empty array', () => {
      const result = Initializer.Object();

      result.should.eql({});
    });
  });

  describe('Set', () => {
    it('returns an empty set', () => {
      const result = Initializer.Set();

      result.should.eql(new Set());
    });
  });
});
