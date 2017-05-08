'use strict';

const should = require('should');

describe('functional', () => {
  const transd = require('../../src');

  const transducer = require('../../src/transducer'),
        functional = require('../../src/functional');

  /**
   * Used as default transform for testing.
   */
  const addOneRemoveOdd = functional.compose(
    transducer.map(x => x + 1), 
    transducer.filter(x => (x % 2) === 0)
  ); 

  describe('into', () => {
    const { into } = transd;

    const transform = addOneRemoveOdd;

    it('supports arrays', () => {
      const iterable = [1, 2, 5],
            initial = [];

      const result = into(transform, initial, iterable);

      result.should.eql([2, 6]);
    });

    it('supports objects', () => {
      const iterable = { a: 1, b: 2, c: 5 },
            initial = {};

      const result = into(transform, initial, iterable);

      result.should.eql({ a: 2, c: 6 });
    });

    it('supports Maps', () => {
      const iterable = new Map(),
            initial = new Map();
      iterable.set('a', 1);
      iterable.set('b', 2);
      iterable.set('c', 5);

      const result = into(transform, initial, iterable);

      result.get('a').should.eql(2);
      result.get('c').should.eql(6);
      result.has('b').should.eql(false);
      result.size.should.eql(2);
    });
  });
});
