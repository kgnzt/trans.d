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

  describe('areSame', () => {
    const { areSame } = type;

    it('returns true when types are the same', () => {
      const left = [],
            right = [1, 2];

      const result = areSame(left, right);

      result.should.eql(true);
    });

    it('returns false when types differ', () => {
      const left = [],
            right = {foo: 'bar'};

      const result = areSame(left, right);

      result.should.eql(false);
    });
  });

  describe('differ', () => {
    const { differ } = type;

    it('returns false when types are the same', () => {
      const left = [],
            right = [1, 2];

      const result = differ(left, right);

      result.should.eql(false);
    });

    it('returns true when types differ', () => {
      const left = [],
            right = {foo: 'bar'};

      const result = differ(left, right);

      result.should.eql(true);
    });
  });
});
