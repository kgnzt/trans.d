'use strict';

const should = require('should');

describe('functional', () => {
  const transd = require('../../src');

  const transducer = require('../../src/transducer'),
        functional = require('../../src/functional');

  /**
   * Complex transform:
   *
   * 1, 2, 5, 8, 9, 11, 21 -> -2, 42, 382
   */
  const transform = functional.compose(
    transducer.map(x => x + 1), 
    transducer.map(x => x * x), 
    transducer.map(x => x - 100),
    transducer.map(x => x - 2),
    transducer.filter(x => x % 2 === 0),
    transducer.map(x => x),
    transducer.drop(2)
  ); 

  describe('into', () => {
    const { into } = transd;

    it('supports arrays', () => {
      const iterable = [1, 2, 5, 8, 9, 11, 21],
            initial = [];

      const result = into(transform, initial, iterable);

      result.should.eql([-2, 42, 382]);
    });

    it('supports objects', () => {
      const iterable = { a: 1, b: 2, c: 5, d: 8, e: 9, f: 11, g: 21 },
            initial = {};

      const result = into(transform, initial, iterable);

      result.should.eql({ e: -2, f: 42, g: 382 });
    });

    it('object rekeying', () => {
      const xform = functional.compose(transform, transducer.rekey(x => `${x}_test`)),
            iterable = { a: 1, b: 2, c: 5, d: 8, e: 9, f: 11, g: 21 },
            initial = {};

      const result = into(xform, initial, iterable);

      result.should.eql({ e_test: -2, f_test: 42, g_test: 382 });
    });

    it('supports Maps', () => {
      const iterable = new Map(),
            initial = new Map();
      iterable.set('a', 1);
      iterable.set('b', 2);
      iterable.set('c', 5);
      iterable.set('d', 8);
      iterable.set('e', 9);
      iterable.set('f', 11);
      iterable.set('g', 21);

      const result = into(transform, initial, iterable);

      result.get('e').should.eql(-2);
      result.get('f').should.eql(42);
      result.get('g').should.eql(382);
      result.size.should.eql(3);
    });
  });
});
