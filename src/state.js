'use strict';

const lodash = require('lodash');

class Wrapper {
  constructor(state) {
    this.state = state;
    this.data = undefined;
    console.log('sdf');
  }

  with (initialize) {
    this.data = lodash.isFunction(initialize) ? initialize(this.state) : initialize;
  }
}

/**
 * State wrapper concept from Juan Pedro Bolivar Puente (ableton/atria).
 */

function complete() {
}

/**
 * A state wrapper.
 *
 * @param {mixed} state
 * @param {function} initialize
 */
function init(state) {
  return new Wrapper(state);
}

function unwrap(state) {
  return state.state;
}

function wrap(state, data) {
  console.log(state);
  console.log(data);
}

module.exports = {
  init,
  wrap,
  unwrap,
  complete
};
