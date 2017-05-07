'use strict';

class Tuple {
  constructor(iteration) {
    if (!Array.isArray(iteration)) {
      throw new TypeError('Must pass an array to Tuple constructor.');
    }
    this._iteration = iteration;
  }

  * [Symbol.iterator]() {
    for (let value of this._iteration) {
      yield value;
    }
  }

  // TODO: TEST
  get rest() {
    return this._iteration.slice(1, (this._iteration.length)); // TODO: test
  }
}

/**
 * Determine if an object is a Tuple.
 *
 * @param {mixed}
 * @return {boolean}
 */
function isTuple (object) {
  return (object instanceof Tuple);
}

module.exports = {
  Tuple,
  isTuple
};
