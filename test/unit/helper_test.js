'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('helper', () => {
  const helper = require('../../src/helper');

  describe('factoryFor', () => {
    const { factoryFor } = helper;

    function factoryForObject () {
      return {
        alpha () {
          return 'beta';
        }
      };
    }

    it('returns a function with the correct signature', () => {
      const object = factoryForObject();

      const result = factoryFor(object);

      result.should.be.a.Function();
      result.length.should.eql(1);
    });

    describe('default', () => {
      it('correctly calls the object key returning result', () => {
        const object = factoryForObject();
  
        const factory = factoryFor(object);

        const result = factory('alpha');

        result.should.eql('beta');
      });

      it('throws the correct error when key not in object', () => {
        const object = factoryForObject();
  
        const factory = factoryFor(object);

        (function () {
          factory('zoozoo');
        }).should.throw('Could not find zoozoo in factory object.');
      });
    });

    describe('custom', () => {
      it('allows for a custom error', () => {
        const object = factoryForObject();
  
        const factory = factoryFor(object, {
          error (key) {
            return `${key} is an issue.`;
          }
        });

        (function () {
          factory('zoozoo');
        }).should.throw('zoozoo is an issue.');
      });
    });
  });
});
