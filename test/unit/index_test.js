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

  describe('transduce', () => {
    const { transduce } = transd;

    const transform = addOneRemoveOdd;

    it('correctly transforms and builds new initial', () => {
      const iterable = [1, 2, 5],
            reducer = (accumulator, input) => {
              accumulator.push(input); 
              return accumulator;
            },
            initial = [];

      const result = transduce(transform, reducer, initial, iterable);

      result.should.eql([2, 6]);
    });
  });

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

    it('supports Sets', () => {
      const iterable = new Set(),
            initial = new Set();
      iterable.add(1);
      iterable.add(2);
      iterable.add(5);

      const result = into(transform, initial, iterable);

      result.has(2).should.eql(true);
      result.has(6).should.eql(true);
      result.size.should.eql(2);
    });

    describe('when iterable and initial differ in type', () => {
      describe('initial array', () => {
        /*
        let iterable = null;
        beforeEach(() => {
          iterable = [1, 2, 5];
        });

        it('', () => {
          const initial = {};

          const xform = transducer.map(x => x + 1)

          //const result = into(xform, initial, iterable);
          //console.log(result);
        });
        */
      });
    });
  });

  describe('sequence', () => {
    const { sequence } = transd;

    const transform = addOneRemoveOdd;

    it('supports arrays', () => {
      const iterable = [1, 2, 5];

      const result = sequence(transform, iterable);

      result.should.eql([2, 6]);
    });

    it('supports objects', () => {
      const iterable = { a: 1, b: 2, c: 5 };

      const result = sequence(transform, iterable);

      result.should.eql({ a: 2, c: 6 });
    });

    it('supports Maps', () => {
      const iterable = new Map();
      iterable.set('a', 1);
      iterable.set('b', 2);
      iterable.set('c', 5);

      const result = sequence(transform, iterable);

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

      const result = sequence(transform, iterable);

      result.has(2).should.eql(true);
      result.has(6).should.eql(true);
      result.size.should.eql(2);
    });
  });
});
