'use strict';

const should = require('should');

describe('lenses', () => {
  const lens = require('../../src/lens'),
        { view, over, set } = lens,
        { extractValue,
          Identity,
          Constant } = require('../../src/category/functor');

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
      });

      it('works as expected', () => {
        const result = Lens.Object('foo', Constant, {foo: 'bar', ping: 'pong'});

        extractValue(result).should.eql('bar');
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

      it('works with set', () => {
        const lens = Lens.Object('foo');

        const result = set(lens, 'ok', {foo: 'bar', ping: 'pong'});

        result.should.eql({
          foo: 'ok',
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
      });

      it('works as expected', () => {
        const result = Lens.Object(1, Constant, ['alpha', 'beta']);

        extractValue(result).should.eql('beta');
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

      it('works with set', () => {
        const lens = Lens.Array(1);

        const result = set(lens, 'ok', ['foo', 'bar']);

        result.should.eql(['foo', 'ok']);
      });
    });
  });
});
