'use strict';

const transd = require('../');

const scoreAdjust = transd.compose(
  transd.map(x => x + 5),
  transd.map(x => x / 2)
); 
const transform = transd.compose(
        transd.lens('score', scoreAdjust),
        transd.filter(x => x.score > 15)
      ),
      input = [{
        name: 'john',
        score: 23
      }, {
        name: 'alice',
        score: 72
      }, {
        name: 'greg',
        score: 34
      }, {
        name: 'candy',
        score: 18
      }];

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
