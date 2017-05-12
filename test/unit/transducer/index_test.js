'use strict';

const should = require('should');

describe('transducer', () => {
  const transducer = require('../../../src/transducer');

  function pickInput (accumulator, input) {
    return input;
  }

  function appendArray (accumulator, input) {
    accumulator.push(input);

    return accumulator;
  }

  function setKey (accumulator, value, key) {
    accumulator[key] = value;

    return accumulator;
  }

  describe('alias functions tested in functional', () => {
    it('includes identity', () => {
      transducer.should.have.property('identity');
    });

    it('includes negate', () => {
      transducer.should.have.property('negate');
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

  describe('dedupe', () => {
    const { dedupe } = transducer;

    it('returns the result of the iteratee', () => {
      const accumulator = [];

      const transform = dedupe()(appendArray);

      transform(accumulator, 2);
      transform(accumulator, 2);
      transform(accumulator, 3);
      const result = transform(accumulator, 2);

      result.should.eql([2, 3]);
    });
  });

  describe('rekey', () => {
    const { rekey } = transducer;

    it('returns the result of the iteratee', () => {
      const iteratee = key => `${key}_append`,
            accumulator = {},
            input = 10;

      const transform = rekey(iteratee)(setKey);
      const result = transform(accumulator, 10, 'key');

      result.should.eql({ key_append: 10 });
    });
  });

  describe('swap', () => {
    const { swap } = transducer;

    it('correctly swaps the input', () => {
      const a = 1,
            b = 2;

      const transform = swap(a, b)((_, d, b, c, a) => `${d}, ${b}, ${c}, ${a}`);
      const result = transform([], 'd', 'c', 'b', 'a');

      result.should.eql('d, b, c, a');
    });
  });

  describe('reversed', () => {
    const { reversed } = transducer;

    it('returns the result of the iteratee', () => {
      const transform = reversed((_, a, b, c) => `${a}, ${b}, ${c}`);
      const result = transform([], 'c', 'b', 'a');

      result.should.eql('a, b, c');
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
