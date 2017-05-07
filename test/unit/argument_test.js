'use strict';

const should = require('should');

describe('tuple', () => {
  const argument = require('../../src/argument');

  describe('Tuple', () => {
    const { Tuple } = argument;

    it('can construct', () => {
      (function () {
        new Tuple(['a', 1]);
      }).should.not.throw();
    });

    it('can be spread', () => {
      function test(one, two) {
        return (one + two);
      }

      const iteration = [3, 10],
            tuple = new Tuple(iteration);

      const result = test(...tuple);

      result.should.eql(13);
    });

    it('will throw if a non array is passed', () => {
      (function () {
        new Tuple('alpha');
      }).should.throw('Must pass an array to Tuple constructor.');
    });
  });

  describe('isTuple', () => {
    const { isTuple } = argument;

    it('returns true when tuple instance passed', () => {
      const object = new argument.Tuple([1, 2]);

      const result = isTuple(object);

      result.should.eql(true);
    });

    it('returns false when non tuple instance passed', () => {
      const object = {foo: 'bar'};

      const result = isTuple(object);

      result.should.eql(false);
    });
  });
});
