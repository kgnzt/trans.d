'use strict';

const transd = require('../');

const transform = transd.compose(
        transd.map(x => x + 1),
        transd.filter(x => x % 2 === 0),
        transd.rekey(key => `${key}_update`)
      ),
      input = {
        alpha: 1,
        beta: 2,
        gamma: 5,
        delta: 5
      };

const array  = transd.into(transform, [], input),
      object = transd.into(transform, {}, input),
      map    = transd.into(transform, new Map(), input),
      set    = transd.into(transform, new Set(), input),
      string = transd.into(transform, '', input),
      number = transd.into(transform, 0, input);

console.log('Array:  ', array);  // [ 2, 6, 6 ]
console.log('Object: ', object); // { alpha_update: 2, gamma_update: 6, delta_update: 6 }
console.log('Map:    ', map);    // Map { 'alpha_update' => 2, 'gamma_update' => 6, 'delta_update' => 6 }
console.log('Set:    ', set);    // Set { 2, 6 }
console.log('String: ', string); // '266'
console.log('Number: ', number); // 14
