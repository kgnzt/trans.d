'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('reducer/remap', () => {
  const remap = require('../../../src/reducer/remap');

  describe('Array', () => {
    let remapping = remap.Array;

    describe('Object', () => {
      let remapper = null;
      beforeEach(() => {
        remapper = remapping.Object();
      });

      it('handles first call correctly', () => {
        const accumulator = {};

        const result = remapper(accumulator, 'alpha');

        result.should.eql({ 0: 'alpha' });
      });

      it('handles multiple calls correctly', () => {
        const accumulator = {};

        remapper(accumulator, 'alpha');
        remapper(accumulator, 'beta');
        const result = remapper(accumulator, 'gamma');

        result.should.eql({ 0: 'alpha', 1: 'beta', 2: 'gamma' });
      });
    });

    describe('Map', () => {
      let remapper = null;
      beforeEach(() => {
        remapper = remapping.Map();
      });

      it('handles first call correctly', () => {
        const accumulator = new Map();

        const result = remapper(accumulator, 'alpha');

        result.has(0).should.eql(true);
        result.get(0).should.eql('alpha');
        result.size.should.eql(1);
      });

      it('handles multiple calls correctly', () => {
        const accumulator = new Map();

        remapper(accumulator, 'alpha');
        remapper(accumulator, 'beta');
        const result = remapper(accumulator, 'gamma');

        result.has(0).should.eql(true);
        result.get(0).should.eql('alpha');
        result.has(1).should.eql(true);
        result.get(1).should.eql('beta');
        result.has(2).should.eql(true);
        result.get(2).should.eql('gamma');
        result.size.should.eql(3);
      });
    });
  });

  describe('Set', () => {
    let remapping = remap.Set;

    describe('Object', () => {
      let remapper = null;
      beforeEach(() => {
        remapper = remapping.Object();
      });

      it('handles first call correctly', () => {
        const accumulator = {};

        const result = remapper(accumulator, 'alpha');

        result.should.eql({ 0: 'alpha' });
      });

      it('handles multiple calls correctly', () => {
        const accumulator = {};

        remapper(accumulator, 'alpha');
        remapper(accumulator, 'beta');
        const result = remapper(accumulator, 'gamma');

        result.should.eql({ 0: 'alpha', 1: 'beta', 2: 'gamma' });
      });
    });

    describe('Map', () => {
      let remapper = null;
      beforeEach(() => {
        remapper = remapping.Map();
      });

      it('handles first call correctly', () => {
        const accumulator = new Map();

        const result = remapper(accumulator, 'alpha');

        result.has(0).should.eql(true);
        result.get(0).should.eql('alpha');
        result.size.should.eql(1);
      });

      it('handles multiple calls correctly', () => {
        const accumulator = new Map();

        remapper(accumulator, 'alpha');
        remapper(accumulator, 'beta');
        const result = remapper(accumulator, 'gamma');

        result.has(0).should.eql(true);
        result.get(0).should.eql('alpha');
        result.has(1).should.eql(true);
        result.get(1).should.eql('beta');
        result.has(2).should.eql(true);
        result.get(2).should.eql('gamma');
        result.size.should.eql(3);
      });
    });
  });
});
