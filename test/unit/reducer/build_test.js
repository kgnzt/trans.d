'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('reducer/build', () => {
  const build = require('../../../src/reducer/build');

  describe('Array', () => {
    it('calls push on accumulator passing input', () => {
      const accumulator = {
              push: sinon.stub()
            },
            input = 13;

      build.Array(accumulator, input);

      accumulator.push.calledWithExactly(input).should.eql(true);
    });

    it('returns the accumulator', () => {
      const accumulator = {
              push: sinon.stub()
            },
            input = 13;

      const result = build.Array(accumulator, input);

      result.should.eql(accumulator);
    });
  });

  describe('Object', () => {
    it('sets the key to equal value on accumulator', () => {
      const accumulator = {},
            value = 1,
            key = 'a';

      build.Object(accumulator, value, key);

      accumulator.should.eql({
        a: 1
      });
    });
  });

  describe('Map', () => {
    it('calls set on accumulator with input key and value', () => {
      const accumulator = {
              set: sinon.stub()
            },
            value = 'b',
            key = 'a';

      build.Map(accumulator, value, key);

      accumulator.set.calledWithExactly('a', 'b').should.eql(true);
    });

    it('returns the accumulator', () => {
      const accumulator = {
              set: sinon.stub()
            },
            input = [1, 2];

      const result = build.Map(accumulator, input);

      result.should.eql(accumulator);
    });
  });

  describe('Set', () => {
    it('calls set on accumulator with input key and value', () => {
      const accumulator = {
              add: sinon.stub()
            },
            input = 1;

      build.Set(accumulator, input);

      accumulator.add.calledWithExactly(1).should.eql(true);
    });

    it('returns the accumulator', () => {
      const accumulator = {
              set: sinon.stub()
            },
            input = [1, 2];

      const result = build.Map(accumulator, input);

      result.should.eql(accumulator);
    });
  });
});
