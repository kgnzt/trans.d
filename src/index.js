'use strict';

const transform = require('./transform'),
      Transduce = require('./transduce'),
      Transducer = require('./transducer'),
      functional = require('./functional');

// TODO: write a helper function to ENSURE no overriding
module.exports = Object.assign({
  transform,
  compose: functional.compose
}, Transduce, Transducer);
