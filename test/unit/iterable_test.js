'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('iterable', () => {
  const iterable = require('../../src/iterable');

  describe('InputTuple', () => {
    const { InputTuple } = iterable;

    it('can construct', () => {
      (function () {
        new InputTuple('a', 1);
      }).should.not.throw();
    });

    it('can be spread', () => {
      function test(one, two) {
        return (one + two);
      }

      const tuple = new InputTuple(3, 10);

      const result = test(...tuple);

      result.should.eql(13);
    });

    it('will default to an empty array', () => {
      function test(input) {
        return input;
      }

      const tuple = new InputTuple();

      tuple._inputs.should.eql([]);
    });
  });

  describe('spreadable', () => {
    const { spreadable } = iterable;

    it('returns an array of passed object when not InputTuple', () => {
      const input = 'alpha';

      const result = spreadable(input);

      result.should.eql(['alpha']);
    });

    it('simply returns the input when already an InputTuple', () => {
      const input = new iterable.InputTuple([1, 2]);

      const result = spreadable(input);

      result.should.equal(input);
    });
  });

  describe('isInputTuple', () => {
    const { isInputTuple } = iterable;

    it('returns true when tuple instance passed', () => {
      const object = new iterable.InputTuple([1, 2]);

      const result = isInputTuple(object);

      result.should.eql(true);
    });

    it('returns false when non tuple instance passed', () => {
      const object = {foo: 'bar'};

      const result = isInputTuple(object);

      result.should.eql(false);
    });
  });

  describe('iterator', () => {
    const { iterator } = iterable;

    function assertInputs (expected, ...inputs) {
      expected.forEach((input, index) => {
        input.should.eql(inputs[index]);
      });
    }

    it('produces an inverted input order iteratin for object', () => {
      const object = { alpha: 1, beta: 2 };

      const result = iterator(object);

      let iteration = 0;
      for (let value of result) {
        switch (iteration) {
          case 2:
            value.should.be.an.instanceOf(iterable.InputTuple);
            assertInputs([1, 'alpha'], ...value);
            break;
          case 1:
            value.should.be.an.instanceOf(iterable.InputTuple);
            assertInputs([2, 'beta'], ...value);
            break;
          default:
            break;
        }

        iteration++;
      }

      iteration.should.eql(2);
    });

    it('produces an inverted argument order iteration for Map', () => {
      const map = new Map();
      map.set('alpha', 1);
      map.set('beta', 2);

      const result = iterator(map);

      let iteration = 0;
      for (let value of result) {
        switch (iteration) {
          case 2:
            value.should.be.an.instanceOf(iterable.InputTuple);
            assertInputs([1, 'alpha'], ...value);
            break;
          case 1:
            value.should.be.an.instanceOf(iterable.InputTuple);
            assertInputs([2, 'beta'], ...value);
            break;
          default:
            break;
        }

        iteration++;
      }

      iteration.should.eql(2);
    });
  });

  describe('isIterable', () => {
    const { isIterable } = iterable;

    it('returns true for an object that has iterable protocol', () => {
      const iterable = [];

      const result = isIterable(iterable);

      result.should.eql(true);
    });

    it('works with custom iterable objects', () => {
      const iterable = {
        [Symbol.iterator]: function* () {
          yield 2;
        }
      };

      const result = isIterable(iterable);

      result.should.eql(true);
    });

    it('returns false for an object that does not have iterable protocol', () => {
      const iterable = 6;

      const result = isIterable(iterable);

      result.should.eql(false);
    });
  });

  describe('from', () => {
    const { from } = iterable;

    it('throws with unknown type', () => {
      class ZooZoo {}

      (function () {
        from(new ZooZoo());
      }).should.throw('Cannot determine the iterator to create for type ZooZoo.');
    });

    it('handles an Array', () => {
      const iterable = [];

      const result = from(iterable);

      result.should.be.an.Array();
    });

    it('handles an Object', () => {
      const iterable = {};

      const result = from(iterable);

      result.should.be.an.Object();
      result.should.eql({});
    });

    it('handles a Map', () => {
      const iterable = new Map();

      const result = from(iterable);

      result.should.be.an.instanceOf(Map);
    });

    it('handles a Set', () => {
      const iterable = new Set();

      const result = from(iterable);

      result.should.be.an.instanceOf(Set);
    });
  });
});
