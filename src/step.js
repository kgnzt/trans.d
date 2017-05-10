'use strict';

const Type = require('./type'),
      remap = require('./remap'),
      build = require('./build'),
      Iterable = require('./iterable');

function between(iterable, state) {
  if (Type.differ(state, iterable)) {
    if (remap.exists(iterable, state)) {
      return remap.between(iterable, state);
    }
  }

  return build.for(state);
}

module.exports = {
  between
};
