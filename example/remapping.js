'use strict';

const transd = require('../');

const transform = transd.compose(
        transd.map(x => x + 1),
        transd.filter(x => x % 2 === 0)
      ),
      iterable = {
        alpha: 1,
        beta: 2,
        gamma: 5,
        delta: 5
      };

const array = transd.into(transform, [], iterable),
      object = transd.into(transform, {}, iterable),
      map = transd.into(transform, new Map(), iterable),
      set = transd.into(transform, new Set(), iterable);

console.log('Array:  ', array);  // [ 2, 6, 6 ]
console.log('Object: ', object); // { alpha: 2, gamma: 6, delta: 6 }
console.log('Map:    ', map);    // Map { 'alpha' => 2, 'gamma' => 6, 'delta' => 6 }
console.log('Set:    ', set);    // Set { 2, 6 }
