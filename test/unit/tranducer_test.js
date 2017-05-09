'use strict';

const should = require('should');

describe('transducer', () => {
  const transducer = require('../../src/transducer');

  function pickInput (accumulator, input) {
    return input;
  }

  describe('alias functions tested in functional', () => {
    it('includes identity', () => {
      transducer.should.have.property('identity');
    });

    it('includes negate', () => {
      transducer.should.have.property('negate');
    });
  });

  describe('forward', () => {
    const { forward } = transducer;

    const { InputTuple } = require('../../src/iterable');

    it('returns the new value as an array when input length was 1', () => {
      const inputs = [10],
            value = 20;

      const result = forward(inputs, value);

      result.should.eql([20]);
    });

    it('returns new array of spreadable inputs if length was greater than 1', () => {
      const inputs = [10, 'alpha', 'beta', 22],
            value = 20;

      const result = forward(inputs, value);

      result.should.eql([20, 'alpha', 'beta', 22]);
    });

    it('when the value is an InputTuple, the input tuple will be forwarded', () => {
      const inputs = [1, 'foo'],
            value = new InputTuple(2, 'fooer');

      const result = forward(inputs, value);

      result.should.equal(value);
    });
  });

  describe('take', () => {
    const { take } = transducer;

    it('returns the input when transform called less than count times', () => {
      const count = 2,
            accumulator = [],
            input = 10;

      // hate this signature...
      const transform = take(count)(pickInput);

      const one = transform(accumulator, input),
            two = transform(accumulator, input),
            three = transform(accumulator, input);

      one.should.eql(input);
      two.should.eql(input);
      three.should.not.eql(input);
    });

    it('returns the accumulator when transform called count times or more', () => {
      const count = 2,
            accumulator = [],
            input = 10;

      // hate this signature...
      const transform = take(count)(pickInput);

      const one = transform(accumulator, input),
            two = transform(accumulator, input),
            three = transform(accumulator, input);

      one.should.not.eql(accumulator);
      two.should.not.eql(accumulator);
      three.should.eql(accumulator);
    });
  });

  describe('drop', () => {
    const { drop } = transducer;

    it('returns the accumulator when transform called less than count times', () => {
      const count = 2,
            accumulator = [],
            input = 10;

      // hate this signature...
      const transform = drop(count)(pickInput);

      const one = transform(accumulator, input),
            two = transform(accumulator, input),
            three = transform(accumulator, input);

      one.should.eql(accumulator);
      two.should.eql(accumulator);
      three.should.not.eql(accumulator);
    });

    it('returns the input when transform called count times or more', () => {
      const count = 2,
            accumulator = [],
            input = 10;

      // hate this signature...
      const transform = drop(count)(pickInput);

      const one = transform(accumulator, input),
            two = transform(accumulator, input),
            three = transform(accumulator, input);

      one.should.not.eql(input);
      two.should.not.eql(input);
      three.should.eql(input);
    });
  });

  describe('filter', () => {
    const { filter } = transducer;

    it('returns the accumulator if predicate evaluates to false', () => {
      const predicate = (x) => x === 5,
            accumulator = [],
            input = 10;

      const transform = filter(predicate)(pickInput);
      const result = transform(accumulator, input);

      result.should.eql(accumulator);
    });

    it('returns the input if predicate evaluates to true', () => {
      const predicate = (x) => x === 5,
            accumulator = [],
            input = 5;

      const transform = filter(predicate)(pickInput);
      const result = transform(accumulator, input);

      result.should.eql(input);
    });
  });

  describe('map', () => {
    const { map } = transducer;

    it('returns the result of the iteratee', () => {
      const iteratee = (x) => x + 3,
            accumulator = [],
            input = 10;

      const transform = map(iteratee)(pickInput);
      const result = transform(accumulator, input);

      result.should.eql(13);
    });
  });

  describe('cat', () => {
    const { cat } = transducer;

    it('correctly reduces', () => {
      const step = (state, input) => {
              state.push(input);
              return state;
            },
            state = [],
            iterable = [[1], [2]];

      const result = cat(step)(state, iterable);

      result.should.eql([1, 2]);
    });
  });
});
