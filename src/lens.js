'use strict';

const Helper       = require('./helper'),
      Type         = require('./type'),
      Combinator   = require('./combinator'),
      Functional   = require('./functional'),
      { map,
        extractValue,
        Identity,
        Constant } = require('./category/functor'),
      { curry,
        pipe }     = require('./functional');

/**
 * Use access operator to return value.
 *
 * @param {array|object} subject - must be able to use access operator
 * @return {mixed} index
 */
function access(subject, index) {
  return subject[index];
}

/**
 * Type specific putters.
 *
 * TODO: deep clone concerns?
 */
const Put = {
  Object: curry((subject, key, value) => {
    subject = Object.assign({}, subject);

    subject[key] = value;

    return subject;
  }),

  Array: curry((subject, index, value) => {
    subject = subject.slice(0);

    subject[index] = value;

    return subject;
  })
};

/**
 * Type specific getters.
 */
const Get = {
  Object: access,

  Array: access
};

/**
 * Generates a type based lens factory.
 *
 * @param {object} lenses
 * @return {function}
 */
function make(lenses) {
  const factory = Helper.factoryFor(lenses, {
    create: Functional.identity,
    error (key) {
      return `Could not determine the lens type to use for: ${key}.`;
    }
  });

  return input => {
    const key = Type.string(input);

    return factory(key);
  };
}

/**
 * Type based lenses.
 */
const Lens = {
  /**
   * Object lens.
   *
   * @param {string} key
   * @param {function} toFunctor
   * @param {object} subject
   * @return {mixed} key
   */
  Object: curry(function (key, toFunctor, subject) {
    return map(Put.Object(subject, key), toFunctor(Get.Object(subject, key)));
  }),

  /**
   * Array lens.
   *
   * @param {number} index
   * @param {function} toFunctor
   * @param {array} subject
   * @return {mixed} key
   */
  Array: curry(function (index, toFunctor, subject) {
    return map(Put.Array(subject, index), toFunctor(Get.Array(subject, index)));
  })
};

/**
 * View lens data.
 *
 * @param {function}
 * @param {mixed}
 * @return {mixed}
 */
function view(lens, subject) {
  return pipe(lens(Constant), extractValue)(subject);
}

/**
 * Run iteratee through lens updating subject. 
 *
 * @param {function}
 * @param {mixed}
 * @return {mixed}
 */
function over(lens, iteratee, subject) {
  return pipe(lens(pipe(iteratee, Identity)), extractValue)(subject);
}

/**
 * Set lens for subject with value.
 *
 * @param {function}
 * @param {mixed}
 * @param {mixed}
 * @return {mixed}
 */
function set(lens, value, subject) {
  return over(lens, Combinator.K(value), subject);
}

module.exports = {
  Lens,
  make,
  over,
  set,
  view
};
