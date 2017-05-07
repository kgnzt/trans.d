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

  const addOne = functional.compose(
    transducer.map(x => x + 1)
  ); 

  describe('sequence', () => {
    const { sequence } = transd;

    const transform = addOne;

    it('supports Maps', () => {
      const iterable = new Map();
      iterable.set('a', 1);
      iterable.set('b', 2);
      iterable.set('c', 5);

      const result = sequence(transform, iterable);

      result.get('a').should.eql(2);
      result.get('b').should.eql(3);
      result.get('c').should.eql(6);
      result.size.should.eql(3);
    });

    it('alpha', () => {
      const iterable = new Map();
      iterable.set('a', 1);
      iterable.set('b', 2);
      iterable.set('c', 5);

      const result = sequence(addOneRemoveOdd, iterable);

      result.get('a').should.eql(2);
      result.get('c').should.eql(6);
      result.size.should.eql(2);
    });
  });
});
