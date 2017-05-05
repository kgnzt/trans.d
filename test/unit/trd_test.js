'use strict';

const should = require('should');

describe('functional', () => {
  const trd = require('../../src/trd');

  const transducer = require('../../src/transducer');
  const functional = require('../../src/functional');

  const addOneRemoveOdd = functional.compose(
    transducer.map(x => {
      //console.log(x);
      return (x + 1);
    }), 
    transducer.filter(x => {
      console.log(x);
      return (x % 2) === 0;
    })
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
      const iterator = [1, 2, 5];

      const result = sequence(addOneRemoveOdd, iterator);

      result.should.eql([2, 6]);
    });

    it('supports objects', () => {
      const iterator = { a: 1, b: 2, c: 5 };

      const result = sequence(addOneRemoveOdd, iterator);

      result.should.eql({ a: 2, c: 6 });
    });

    it('supports Maps', () => {
      const iterator = new Map();
      iterator.set('a', 1);
      iterator.set('b', 2);
      iterator.set('c', 5);
      console.log(iterator);

      const result = sequence(addOneRemoveOdd, iterator);

      console.log(result);

      //result.should.eql({ a: 2, c: 6 });
    });
  });
});
