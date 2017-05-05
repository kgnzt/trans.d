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

    it('supports an array', () => {
      const iterator = [1, 2, 5];

      const result = sequence(addOneRemoveOdd, iterator);

      result.should.eql([2, 6]);
    });

    it('supports an object', () => {
      const iterator = { a: 1, b: 2, c: 5 };

      const result = sequence(addOneRemoveOdd, iterator);

      result.should.eql({ a: 2, c: 6 });
    });
  });
});
