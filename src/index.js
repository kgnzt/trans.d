'use strict';

const functional = require('./functional'),
      transduce = require('./transduce'),
      transducer = require('./transducer'),
      reducing = require('./reducing');

/*
const transform = functional.compose(
  transducer.identity,
  transducer.map(x => x + 1), 
  transducer.map(x => x * 3), 
  transducer.filter(x => (x % 2) === 0),
  transducer.map(functional.counter((iteration, value) => {
    return [iteration, value];
  }))); 

const map = new Map(),
      iterator = [10, 9, 41, 3, 8];

const result = transduce.into(transform, map, iterator);
*/

module.exports = {};
