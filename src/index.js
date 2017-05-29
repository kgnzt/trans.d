'use strict';

const transform  = require('./transform'),
      Transduce  = require('./transduce'),
      Transducer = require('./transducer'),
      functional = require('./functional'),
      api        = require('./transducer/api');

// TODO: write a helper function to ENSURE no overriding
module.exports = Object.assign({
  transform,
  compose: functional.compose,
  api
}, Transduce, Transducer);
