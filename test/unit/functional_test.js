'use strict';

const should = require('should');

describe('functional', () => {
  const functional = require('../../src/functional');

  describe('negate', () => {
    const { negate } = functional;

    it('returns a function', () => {
      const predicate = (input) => input;

      const result = negate(predicate);

      result.should.be.a.Function();
    });

    it('returned function returns complement of predicate', () => {
      const predicate = (input) => input === 'foo';

      const result = negate(predicate)('foo');

      result.should.eql(false);
    });

    it('forwards all arguments', () => {
      const predicate = (...args) => args.length !== 3;

      const result = negate(predicate)('one', 'two', 'three');

      result.should.eql(true);
    });
  });

  describe('identity', () => {
    const { identity } = functional;

    it('returns the input', () => {
      const input = 'alpha';

      const result = identity(input);

      result.should.eql(input);
    });
  });

  describe('counter', () => {
    const { counter } = functional;

    it('increments the value passed to func on each call', () => {
      const func = (iteration) => {
              return iteration;
            };

      const iterate = counter(func);

      iterate().should.eql(0);
      iterate().should.eql(1);
      iterate().should.eql(2);
    });

    it('forwards any additional arguments', () => {
      const func = (iteration, ...args) => {
              return [iteration].concat(...args);
            };

      const iterate = counter(func);

      iterate('a', 'b').should.eql([0, 'a', 'b']);
      iterate('foo', 'bar').should.eql([1, 'foo', 'bar']);
      iterate(1, 10).should.eql([2, 1, 10]);
    });
  });

  describe('compose', () => {
    const { compose } = functional;

    it('returns a new function', () => {
      const f = (x) => x + 5,
            g = (x) => x / 10;

      const result = compose(f, g);

      result.should.be.a.Function();
    });

    it('correctly composes the two passed functions', () => {
      const f = (x) => x + 5,
            g = (x) => x / 10;

      const result = compose(f, g);

      const value = result(10);

      value.should.eql(6);
    });
  });

  describe('accumulate', () => {
    const { accumulate } = functional;

    it('correctly accumulates a result', () => {
      const reducer = (accumulator, input) => {
              return accumulator += input;
            },
            accumulator = 0,
            iterator = [1, 4, 5];

      const result = accumulate(reducer, accumulator, iterator);

      result.should.eql(10);
    });

    it('can handle custom iterators', () => {
      const reducer = (accumulator, input) => {
              return accumulator += input;
            },
            accumulator = 0,
            iterator = {
              [Symbol.iterator]: function* () {
                yield 1;
                yield 4;
                yield 5;
              }
            };

      const result = accumulate(reducer, accumulator, iterator);

      result.should.eql(10);
    });
  });
});

