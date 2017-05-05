'use strict';

const should = require('should');

describe('type', () => {
  const type = require('../../src/type');

  describe('string', () => {
    const { string } = type;

    it('returns `String` when string passed', () => {
      string('foo').should.eql('String');
    });

    it('returns `Array` when array passed', () => {
      string([]).should.eql('Array');
    });

    it('returns `Object` when object passed', () => {
      string({}).should.eql('Object');
    });

    it('returns `Map` when Map passed', () => {
      string(new Map()).should.eql('Map');
    });

    it('returns `Set` when Set passed', () => {
      string(new Set()).should.eql('Set');
    });
  });
});
