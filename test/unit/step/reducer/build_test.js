'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('reducer/build', () => {
  const build = require('../../../../src/step/reducer/build');

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
            value = 10,
            key = 'a';

      build.Map(accumulator, value, key);

      accumulator.set.calledWithExactly('a', 10).should.eql(true);
    });

    it('returns the accumulator', () => {
      const accumulator = {
              set: sinon.stub()
            },
            value = 10,
            key = 'a';

      const result = build.Map(accumulator, value, key);

      result.should.eql(accumulator);
    });
  });

  describe('Number', () => {
    it('adds value to accumulator', () => {
      const accumulator = 2,
            input = 13;

      const result = build.Number(accumulator, input);

      result.should.eql(15);
    });
  });

  describe('String', () => {
    it('concats the accumulator to the input value', () => {
      const accumulator = 'hello ',
            input = 'world';

      const result = build.String(accumulator, input);

      result.should.eql('hello world');
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
              add: sinon.stub()
            },
            input = [1, 2];

      const result = build.Set(accumulator, input);

      result.should.eql(accumulator);
    });
  });
});
