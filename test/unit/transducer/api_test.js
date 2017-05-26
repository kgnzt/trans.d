'use strict';

const should = require('should');

describe('transducer/helper', () => {
  const helper = require('../../../src/transducer/api');

  describe('Action', () => {
    const { Action } = helper;

    it('defines terminate', () => {
      Action.should.have.property('terminate');
      (typeof Action.terminate).should.eql('symbol');
    });
  });

  describe('forward', () => {
    const { forward } = helper;

    const { InputTuple } = require('../../../src/iterable');

    it('returns the new value as an array when input length was 1', () => {
      const inputs = [10],
            value = 20;

      const result = forward(inputs, value);

      result.should.eql([20]);
    });

    it('returns new array of spreadable inputs if length was greater than 1', () => {
      const inputs = [10, 'alpha', 'beta', 22],
            value = 20;

      const result = forward(inputs, value);

      result.should.eql([20, 'alpha', 'beta', 22]);
    });

    it('when the value is an InputTuple, the input tuple will be forwarded', () => {
      const inputs = [1, 'foo'],
            value = new InputTuple(2, 'fooer');

      const result = forward(inputs, value);

      result.should.equal(value);
    });
  });
});
