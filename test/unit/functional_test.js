'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('functional', () => {
  const functional = require('../../src/functional');

  describe('isNotIdentical', () => {
    const { isNotIdentical } = functional;

    it('is curried', () => {
      const curried = isNotIdentical(10);

      curried(100).should.eql(true);
    });

    it('returns true when right is not identical to left', () => {
      isNotIdentical(10, 100).should.eql(true);
    });

    it('returns false when right is identical to left', () => {
      isNotIdentical(10, 10).should.eql(false);
    });
  });

  describe('isNotEqual', () => {
    const { isNotEqual } = functional;

    it('is curried', () => {
      const curried = isNotEqual(10);

      curried(100).should.eql(true);
    });

    it('returns true when right is not equal to left', () => {
      isNotEqual(0, true).should.eql(true);
    });

    it('returns false when right is equal to left', () => {
      isNotEqual(0, false).should.eql(false);
    });
  });

  describe('lessThan', () => {
    const { lessThan } = functional;

    it('is curried', () => {
      const curried = lessThan(2);

      curried(1).should.eql(true);
    });

    it('returns true when left is less than right', () => {
      lessThan(20, 10).should.eql(true);
    });

    it('returns false when left is equal to right', () => {
      lessThan(10, 10).should.eql(false);
    });

    it('returns false when left is greater than right', () => {
      lessThan(5, 10).should.eql(false);
    });
  });

  describe('lessThanOrEqualTo', () => {
    const { lessThanOrEqualTo } = functional;

    it('is curried', () => {
      const curried = lessThanOrEqualTo(2);

      curried(1).should.eql(true);
    });

    it('returns true when left is less than right', () => {
      lessThanOrEqualTo(20, 10).should.eql(true);
    });

    it('returns true when left is equal to right', () => {
      lessThanOrEqualTo(10, 10).should.eql(true);
    });

    it('returns false when left is greater than right', () => {
      lessThanOrEqualTo(5, 10).should.eql(false);
    });
  });

  describe('greaterThan', () => {
    const { greaterThan } = functional;

    it('is curried', () => {
      const curried = greaterThan(2);

      curried(3).should.eql(true);
    });

    it('returns true when left is greater than right', () => {
      greaterThan(5, 10).should.eql(true);
    });

    it('returns false when left is equal to right', () => {
      greaterThan(10, 10).should.eql(false);
    });

    it('returns false when left is less than right', () => {
      greaterThan(10, 5).should.eql(false);
    });
  });

  describe('greaterThanOrEqualTo', () => {
    const { greaterThanOrEqualTo } = functional;

    it('is curried', () => {
      const curried = greaterThanOrEqualTo(2);

      curried(3).should.eql(true);
    });

    it('returns true when left is greater than right', () => {
      greaterThanOrEqualTo(5, 10).should.eql(true);
    });

    it('returns true when left is equal to right', () => {
      greaterThanOrEqualTo(10, 10).should.eql(true);
    });

    it('returns false when left is less than right', () => {
      greaterThanOrEqualTo(10, 5).should.eql(false);
    });
  });

  describe('curry', () => {
    const { curry } = functional;

    function test(a, b) {
      return (a + b);
    }

    it('generates a function', () => {
      const result = curry(test);

      result.should.be.a.Function();
    });

    it('calls curried function when all parameters passed', () => {
      const curried = curry(test);

      const result = curried(1, 9);

      result.should.eql(10);
    });

    it('delays calling function when not all parameters passed', () => {
      const curried = curry(test);

      const result = curried(1)(9);

      result.should.eql(10);
    });

    it('allows custom arity', () => {
      const callAfter2 = (a, b, c, d, e) => 'alpha';

      const curried = curry(callAfter2, 2);

      const result = curried(1)(2);

      result.should.eql('alpha');
    });
  });

  describe('times', () => {
    const { times } = functional;

    it('calls iteratee count times', () => {
      const func = sinon.spy();

      times(5, func);

      func.callCount.should.eql(5);
    });

    it('returns the result of calling iteratee', () => {
      const func = sinon.stub();

      func.returns('a');

      const result = times(5, func);

      result.should.eql('a');
    });
  });

  describe('call', () => {
    const { call } = functional;

    it('calls the passed input', () => {
      const func = sinon.spy();

      call(func);

      func.called.should.eql(true);
    });

    it('returns the result of called func', () => {
      const func = sinon.stub(),
            resultDouble = sinon.stub();

      func.returns(resultDouble);

      const result = call(func);

      result.should.equal(resultDouble);
    });
  });

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

    it('passes the number of functions composed as the last argument', () => {
      const f = (x, _, count) => x + count,
            g = (x, _, count) => x * count;

      const result = compose(f, g);

      const value = result(10);

      value.should.eql(22);
    });
  });
});
