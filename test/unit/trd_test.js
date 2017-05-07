'use strict';

const should = require('should');

describe('functional', () => {
  const trd = require('../../src/trd');

  const transducer = require('../../src/transducer');
  const functional = require('../../src/functional');

  const addOneRemoveOdd = functional.compose(
    transducer.map(x => x + 1), 
    transducer.filter(x => (x % 2) === 0)
  ); 

  describe('transduce', () => {
    const { transduce } = trd;

    it('returns the input', () => {
    });
  });

  describe('into', () => {
    const { into } = trd;

    it('returns the input', () => {
    });
  });

  describe('sequence', () => {
    const { sequence } = trd;

    it('supports arrays', () => {
      const iterable = [1, 2, 5];

      const result = sequence(addOneRemoveOdd, iterable);

      result.should.eql([2, 6]);
    });

    it('supports objects', () => {
      const iterable = { a: 1, b: 2, c: 5 };

      const result = sequence(addOneRemoveOdd, iterable);

      result.should.eql({ a: 2, c: 6 });
    });

    it('supports Maps', () => {
      const iterable = new Map();
      iterable.set('a', 1);
      iterable.set('b', 2);
      iterable.set('c', 5);

      const result = sequence(addOneRemoveOdd, iterable);

      result.get('a').should.eql(2);
      result.get('c').should.eql(6);
      result.has('b').should.eql(false);
      result.size.should.eql(2);
    });

    it('supports Sets', () => {
      const iterable = new Set();
      iterable.add(1);
      iterable.add(2);
      iterable.add(5);

      const result = sequence(addOneRemoveOdd, iterable);

      result.has(2).should.eql(true);
      result.has(6).should.eql(true);
      result.size.should.eql(2);
    });
  });
});
