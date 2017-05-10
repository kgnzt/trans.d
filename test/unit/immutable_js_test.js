'use strict';

const should = require('should');

describe('immutable.js', () => {
  const transduce = require('../../src/transduce'),
        transducer = require('../../src/transducer'),
        functional = require('../../src/functional'),
        immutable = require('immutable');

  /**
   * Used as default transform for testing.
   */
  const addOneRemoveOdd = functional.compose(
    transducer.map(x => x + 1), 
    transducer.filter(x => (x % 2) === 0)
  ); 

  describe('sequence', () => {
    const { sequence } = transduce;

    const transform = addOneRemoveOdd;

    it('supports Map', () => {
      const iterable = immutable.Map({a: 1, b: 2, c: 5});

      const result = sequence(transform, iterable);

      result.should.eql({ a: 2, c: 6 });
    });

    it('supports Set', () => {
      const iterable = immutable.Set([1, 2, 5]);

      const result = sequence(transform, iterable);

      result.should.eql([2, 6]);
    });
  });
});
