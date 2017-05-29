'use strict';

const should = require('should'),
      sinon  = require('sinon');

describe('lenses', () => {
  const lens = require('../../src/lens'),
        { view, over, set } = lens,
        { Identity,
          Constant } = require('../../src/functor');

  describe('Lens', () => {
    const { Lens } = lens;

    describe('Object', () => {
      it('correctly creates a function', () => {
        const lens = Lens.Object('foo');

        lens.should.be.a.Function();
      });

      it('is curried', () => {
        const two = Lens.Object('foo', Constant);

        two.should.be.a.Function();

        const result = two({foo: 'bar', ping: 'pong'});

        result.value.should.eql('bar');
      });

      it('works as expected', () => {
        const result = Lens.Object('foo', Constant, {foo: 'bar', ping: 'pong'});

        result.value.should.eql('bar');
      });

      it('works with view', () => {
        const lens = Lens.Object('foo');

        const result = view(lens, {foo: 'bar', ping: 'pong'});

        result.should.eql('bar');
      });

      it('works with over', () => {
        const lens = Lens.Object('foo');

        const result = over(lens, x => `${x}_append`, {foo: 'bar', ping: 'pong'});

        result.should.eql({
          foo: 'bar_append',
          ping: 'pong'
        });
      });
    });

    describe('Array', () => {
      it('correctly creates a function', () => {
        const lens = Lens.Array(1);

        lens.should.be.a.Function();
      });

      it('is curried', () => {
        const two = Lens.Object(1, Constant);

        two.should.be.a.Function();

        const result = two(['alpha', 'beta']);

        result.value.should.eql('beta');
      });

      it('works as expected', () => {
        const result = Lens.Object(1, Constant, ['alpha', 'beta']);

        result.value.should.eql('beta');
      });

      it('works with view', () => {
        const lens = Lens.Array(1);

        const result = view(lens, ['alpha', 'beta']);

        result.should.eql('beta');
      });

      it('works with over', () => {
        const lens = Lens.Array(1);

        const result = over(lens, x => `${x}_append`, ['alpha', 'beta']);

        result.should.eql([
          'alpha',
          'beta_append'
        ]);
      });
    });
  });
});
