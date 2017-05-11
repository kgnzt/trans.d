'use strict';

const should = require('should');

describe('reducing', () => {
  const reducing = require('../../../../src/step/reducer');

  describe('identity', () => {
    const { identity } = reducing;

    it('returns the input value', () => {
      const accumulator = 'alpha',
            input = 'beta';

      const result = identity(accumulator, input);

      result.should.eql(input);
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
