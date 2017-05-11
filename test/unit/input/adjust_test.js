'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('input/adjuster', () => {
  const adjuster = require('../../../src/input/adjuster'),
        Iterable = require('../../../src/iterable');

  function assertInputs (expected, ...inputs) {
    expected.forEach((input, index) => {
      input.should.eql(inputs[index]);
    });
  }

  describe('Object', () => {
    it('produces an inverted input order iteratin for object', () => {
      const object = { alpha: 1, beta: 2 };
  
      const result = adjuster.Object(object);
  
      let iteration = 0;
      for (let value of result) {
        switch (iteration) {
          case 2:
            value.should.be.an.instanceOf(Iterable.InputTuple);
            assertInputs([1, 'alpha'], ...value);
            break;
          case 1:
            value.should.be.an.instanceOf(Iterable.InputTuple);
            assertInputs([2, 'beta'], ...value);
            break;
          default:
            break;
        }
  
        iteration++;
      }
  
      iteration.should.eql(2);
    });
  });

  describe('Map', () => {
    it('produces an inverted argument order iteration for Map', () => {
      const map = new Map();
      map.set('alpha', 1);
      map.set('beta', 2);
  
      const result = adjuster.Map(map);
  
      let iteration = 0;
      for (let value of result) {
        switch (iteration) {
          case 2:
            value.should.be.an.instanceOf(Iterable.InputTuple);
            assertInputs([1, 'alpha'], ...value);
            break;
          case 1:
            value.should.be.an.instanceOf(Iterable.InputTuple);
            assertInputs([2, 'beta'], ...value);
            break;
          default:
            break;
        }
  
        iteration++;
      }
  
      iteration.should.eql(2);
    });
  });
});
