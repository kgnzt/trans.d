'use strict';

const should = require('should');

describe('transducer tests (using transduce)', () => {
  const { transduce } = require('../../src/transduce'),
        Lens = require('../../src/lens'),
        transducer = require('../../src/transducer'),
        functional = require('../../src/functional'),
        { compose } = functional;

  function buildArray(state, ...inputs) {
    state.push(...inputs);

    return state;
  }

  function buildObject(state, value, key) {
    state[key] = value;

    return state;
  }

  describe('lensOver', () => {
    const { lensOver } = transducer;

    it('correctly transforms object based complex data structure', () => {
      const input = [{
              name: 'john',
              size: 1
            }, {
              name: 'alice',
              size: 2
            }],
            output = [];

      const result = transduce(compose(
        transducer.lensOver('size', transducer.filter(x => x === 2))
      ), buildArray, output, input);
      //console.log(result);

      result.should.eql([{ name: 'alice', size: 30 }]);
    });
  });

  describe('lens', () => {
    const { lens } = transducer;

    it('correctly transforms object based complex data structure', () => {
      const input = [{
              name: 'john',
              size: 1
            }, {
              name: 'alice',
              size: 2
            }],
            output = [];

      const result = transduce(compose(
        transducer.lens('size', compose(
          transducer.map(x => x + 1),
          transducer.map(x => x * 10)
        )),
        transducer.filter(x => x.name === 'alice')
      ), buildArray, output, input);

      result.should.eql([{ name: 'alice', size: 30 }]);
    });

    it('correctly transforms array based complex data structure', () => {
      const input = [[1, 2, 3], [2, 3, 4]],
            output = [];

      const result = transduce(compose(
        transducer.lens(1, compose(
          transducer.map(x => x + 1)
        )),
        transducer.cat,
        transducer.filter(x => x === 3)
      ), buildArray, output, input);

      result.should.eql([3, 3]);
    });
  });

  describe('maxima', () => {
    const { maxima } = transducer;

    it('has correct peak picking behavior', () => {
      const input = [5, 3, 8, 3, 4, 5, 7, 3, -1, -2, -1, 8],
            output = [];

      const result = transduce(maxima, buildArray, output, input);

      result.should.eql([5, 8, 7, 8]);
    });
  });

  describe('enumerate', () => {
    const { enumerate } = transducer;

    it('correctly enumerates inputs', () => {
      const input = [1, 2, 3],
            output = [];

      const result = transduce(enumerate(), buildArray, output, input);

      result.should.eql([0, 1, 1, 2, 2, 3]);
    });
  });

  describe('take', () => {
    const { take } = transducer;

    it('correctly picks count inputs', () => {
      const input = [1, 2, 3, 4, 5],
            output = [];

      const result = transduce(take(2), buildArray, output, input);

      result.should.eql([1, 2]);
    });
  });

  describe('drop', () => {
    const { drop } = transducer;

    it('correctly removes first count inputs', () => {
      const input = [1, 2, 3, 4, 5],
            output = [];

      const result = transduce(drop(2), buildArray, output, input);

      result.should.eql([3, 4, 5]);
    });
  });

  describe('interpose', () => {
    const { interpose } = transducer;

    it('correctly inserts between each input', () => {
      const input = ['a', 'b', 'c'],
            output = [];

      const result = transduce(interpose(','), buildArray, output, input);

      result.should.eql(['a', ',', 'b', ',', 'c']);
    });
  });

  describe('repeat', () => {
    const { repeat } = transducer;

    it('correctly repeats inputs', () => {
      const input = [1, 2, 3],
            output = [];

      const result = transduce(repeat(2), buildArray, output, input);

      result.should.eql([1, 1, 1, 2, 2, 2, 3, 3, 3]);
    });
  });

  describe('dedupe', () => {
    const { dedupe } = transducer;

    it('correctly removes duplicates', () => {
      const input = [1, 2, 2, 3, 4, 5, 5],
            output = [];

      const result = transduce(dedupe, buildArray, output, input);

      result.should.eql([1, 2, 3, 4, 5]);
    });
  });

  describe('swap', () => {
    const { swap } = transducer;

    it('correctly swaps inputs', () => {
      const input = {a: 1, b: 2},
            output = {};

      const result = transduce(swap(0, 1), buildObject, output, input);

      result.should.eql({
        '1': 'a',
        '2': 'b'
      });
    });
  });

  describe('rekey', () => {
    const { rekey } = transducer;

    it('correctly rekeys associatives binary inputs', () => {
      const input = {a: 1, b: 2},
            output = {};

      const result = transduce(rekey(key => `${key}_adjust`), buildObject, output, input);

      result.should.eql({
        a_adjust: 1,
        b_adjust: 2
      });
    });
  });

  describe('buffer', () => {
    const { buffer } = transducer;

    it('correctly buffers count inputs at a time', () => {
      const input = [1, 2, 3, 4, 5, 6],
            output = [];

      const result = transduce(buffer(3), buildArray, output, input);

      result.should.eql([[[1], [2], [3]], [[4], [5], [6]]]);
    });
  });
});
