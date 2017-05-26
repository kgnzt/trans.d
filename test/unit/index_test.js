'use strict';

const should = require('should');

describe('functional', () => {
  const transd = require('../../src');

  const transducer = require('../../src/transducer'),
        iterable = require('../../src/iterable'),
        functional = require('../../src/functional');

  /**
   * Used as default transform for testing.
   */
  const addOneRemoveOdd = functional.compose(
    transducer.map(x => x + 1), 
    transducer.filter(x => (x % 2) === 0)
  ); 

  describe('exports', () => {
    it('exports transducers at root of package', () => {
      [
       'take',
       'drop',
       'map',
       'filter'
      ].forEach(property => {
        transd.should.have.property(property);
      });
    });

    it('exports compose at root of package', () => {
      transd.should.have.property('compose');
    });

    it('exports transform at root of package', () => {
      transd.should.have.property('transform');
    });

    it('exports api at root of package', () => {
      transd.should.have.property('api');
    });

    describe('transform', () => {
      const { transform } = transd;

      it('exports transforms at root.transform package level', () => {
        [
         'square',
         'removeEven',
         'removeOdd',
         'log',
         'pow'
        ].forEach(property => {
          transform.should.have.property(property);
        });
      });
    });
  });

  describe('transduce', () => {
    const { api } = transd;

    it('exports transducer api methods', () => {
      [
       'complete',
       'forward',
       'inner',
       'isWrapped',
       'outter',
       'transducer',
       'unwrap',
       'wrap'
      ].forEach(property => {
        api.should.have.property(property);
      });
    });
  });

  describe('transduce', () => {
    const { transduce } = transd;

    const transform = addOneRemoveOdd,
          { InputTuple } = iterable;

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

    it('supports n-ary transformations via InputTuple', () => {
      const iterable = {
              large: 5,
              cute: 10
            },
            xform = transducer.map((value, key) => new InputTuple(value + 1, `${key}r`)), 
            reducer = (accumulator, value, key) => {
              accumulator[key] = value;

              return accumulator;
            },
            initial = {};

      const result = transduce(xform, reducer, initial, iterable);

      result.should.eql({ larger: 6, cuter: 11 });
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

    it('supports strings', () => {
      const xform = transducer.map(x => `${x}o`),
            iterable = 'nn';

      const result = into(xform, '', iterable);

      result.should.eql('nono');
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
      describe('iterable string', () => {
        const xform = functional.compose(
          transducer.map(x => x + 1)
        ); 

        let iterable = null;
        beforeEach(() => {
          iterable = 'hi';
        });

        it('correctly appends into an array', () => {
          const initial = [];

          const result = into(xform, initial, iterable);

          result.should.eql(['h1', 'i1']);
        });

        it('correctly appends into an object', () => {
          const initial = {};

          const result = into(xform, initial, iterable);

          result.should.eql({
            '0': 'h1',
            '1': 'i1'
          });
        });

        it('correctly appends into a Map', () => {
          const initial = new Map();

          const result = into(xform, initial, iterable);

          result.has(0).should.eql(true);
          result.get(0).should.eql('h1');
          result.has(1).should.eql(true);
          result.get(1).should.eql('i1');
        });

        it('correctly appends into a Set', () => {
          const initial = new Set();

          const result = into(xform, initial, iterable);

          result.has('h1').should.eql(true);
          result.has('i1').should.eql(true);
          result.size.should.eql(2);
        });
      });

      describe('iterable array', () => {
        let iterable = null;
        beforeEach(() => {
          iterable = [1, 2, 5];
        });

        it('correctly appends into an object', () => {
          const initial = {};

          const result = into(transform, initial, iterable);

          result.should.have.property('0');
          result.should.have.property('1');
          result['0'].should.eql(2);
          result['1'].should.eql(6);
        });

        it('correctly appends into a string', () => {
          const initial = '';

          const result = into(transform, initial, iterable);

          result.should.eql('26');
        });

        it('correctly appends into a Map', () => {
          const initial = new Map();

          const result = into(transform, initial, iterable);

          result.has(0).should.eql(true);
          result.get(0).should.eql(2);
          result.has(1).should.eql(true);
          result.get(1).should.eql(6);
        });

        it('correctly appends into a Set', () => {
          const initial = new Set();

          const result = into(transform, initial, iterable);

          result.has(2).should.eql(true);
          result.has(6).should.eql(true);
          result.size.should.eql(2);
        });

        it('correctly appends into a Set when duplicate value', () => {
          const initial = new Set();

          const result = into(transform, initial, [1, 1, 2, 5]); // extra 2

          result.has(2).should.eql(true);
          result.has(6).should.eql(true);
          result.size.should.eql(2);
        });
      });

      describe('iterable object', () => {
        let iterable = null;
        beforeEach(() => {
          iterable = {a: 1, b: 2, c: 5};
        });

        it('correctly appends into an array', () => {
          const initial = [];

          const result = into(transform, initial, iterable);

          result.should.eql([2, 6]);
        });

        it('correctly appends into a string', () => {
          const initial = '';

          const result = into(transform, initial, iterable);

          result.should.eql('26');
        });

        it('correctly appends into a Map', () => {
          const initial = new Map();

          const result = into(transform, initial, iterable);

          result.has('a').should.eql(true);
          result.get('a').should.eql(2);
          result.has('c').should.eql(true);
          result.get('c').should.eql(6);
          result.size.should.eql(2);
        });

        it('correctly appends into a Set', () => {
          const initial = new Set();

          const result = into(transform, initial, iterable);

          result.has(2).should.eql(true);
          result.has(6).should.eql(true);
          result.size.should.eql(2);
        });

        it('correctly appends into a Set when duplicate value', () => {
          const initial = new Set();

          const result = into(transform, initial, [1, 1, 2, 5]); // extra 2

          result.has(2).should.eql(true);
          result.has(6).should.eql(true);
          result.size.should.eql(2);
        });
      });

      describe('iterable set', () => {
        let iterable = null;
        beforeEach(() => {
          iterable = new Set();
          iterable.add(1);
          iterable.add(2);
          iterable.add(5);
        });

        it('correctly appends into an array', () => {
          const initial = [];

          const result = into(transform, initial, iterable);

          result.should.eql([2, 6]);
        });

        it('correctly appends into a string', () => {
          const initial = '';

          const result = into(transform, initial, iterable);

          result.should.eql('26');
        });

        it('correctly appends into an object', () => {
          const initial = {};

          const result = into(transform, initial, iterable);

          result.should.have.property('0');
          result.should.have.property('1');
          result['0'].should.eql(2);
          result['1'].should.eql(6);
        });

        it('correctly appends into an Map', () => {
          const initial = new Map();

          const result = into(transform, initial, iterable);

          result.has(0).should.eql(true);
          result.get(0).should.eql(2);
          result.has(1).should.eql(true);
          result.get(1).should.eql(6);
          result.size.should.eql(2);
        });
      });
    });

    describe('customer iteration', () => {
    });

    describe('customer building', () => {
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
