'use strict';

const should = require('should');

describe('functor', () => {
  const functor = require('../../../src/category/functor'),
        { map,
          extractValue } = functor,
        { compose } = require('../../../src/functional');

  const id = x => x,
        inc = x => x + 1,
        times2 = x => x * 2;

  describe('Interface', () => {
    const { Interface } = functor;

    it('defines map', () => {
      Interface.should.have.property('map');
    });

    it('defines value', () => {
      Interface.should.have.property('value');
    });
  });

  describe('Identity', () => {
    const { Identity } = functor;

    it('constructs correctly', () => {
      const result = map(x => x + 1, Identity(10));

      extractValue(result).should.eql(11);
    });

    it('obeys identity functor law', () => {
      const result = map(id, Identity(10));

      extractValue(result).should.equal(extractValue(Identity(10)));
    });

    it('obeys compose functor law', () => {
      const mapCompose = map(compose(times2, inc), Identity(10));
      const composeMap = map(times2, map(inc, Identity(10)));

      mapCompose.should.eql(composeMap);
    });
  });

  describe('Constant', () => {
    const { Constant } = functor;

    it('constructs correctly', () => {
      const result = map(x => x + 1, Constant(10));

      extractValue(result).should.eql(10);
    });

    it('obeys identity functor law', () => {
      const result = map(id, Constant(10));

      result.should.eql(Constant(10));
    });

    it('obeys compose functor law', () => {
      const mapCompose = map(compose(times2, inc), Constant(10));
      const composeMap = map(times2, map(inc, Constant(10)));

      mapCompose.should.eql(composeMap);
    });
  });

  describe('map', () => {
    const { Identity } = functor;

    it('is curried', () => {
      const mapInputOne = map(x => x + 1);

      mapInputOne.should.be.a.Function();
    });

    it('correctly aplies the morphism to the functor', () => {
      const result = map(x => x + 1, Identity(10));

      extractValue(result).should.eql(11);
    });
  });

  describe('extractValue', () => {
    const { extractValue, Interface } = functor;

    it('returns value', () => {
      const result = extractValue({ [Interface.value]: 'foo' });

      result.should.eql('foo');
    });
  });
});
