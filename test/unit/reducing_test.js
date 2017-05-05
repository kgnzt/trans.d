'use strict';

const should = require('should');

describe('reducing', () => {
  const reducing = require('../../src/reducing');

  describe('identity', () => {
    const { identity } = reducing;

    it('returns the input value', () => {
      const accumulator = 'alpha',
            input = 'beta';

      const result = identity(accumulator, input);

      result.should.eql(input);
    });
  });

  describe('array', () => {
    const { array } = reducing;

    it('pushes the input onto the accumulator', () => {
      const accumulator = [],
            input = 'alpha';

      const result = array(accumulator, input);

      result.should.eql([ input ]);
    });
  });

  describe('func', () => {
    const { func } = reducing;

    it('calls the input with the accumulator', () => {
      const accumulator = 10,
            input = (x) => {
              return x + 3;
            };

      const result = func(accumulator, input);

      result.should.eql(13);
    });
  });
});
