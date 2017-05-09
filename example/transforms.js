'use strict';

const transd = require('../'),
      { transform } = transd;

const xform = transd.compose(
        transform.square,
        transform.log
      ),
      iterable = {
        alpha: 1,
        beta: 2,
        gamma: 5,
        delta: 5
      };

const array = transd.into(xform, [], iterable),
      object = transd.into(xform, {}, iterable),
      map = transd.into(xform, new Map(), iterable),
      set = transd.into(xform, new Set(), iterable),
      string = transd.into(xform, '', iterable);

console.log('Array:  ', array);  // [ 2, 6, 6 ]
console.log('Object: ', object); // { alpha: 2, gamma: 6, delta: 6 }
console.log('Map:    ', map);    // Map { 'alpha' => 2, 'gamma' => 6, 'delta' => 6 }
console.log('Set:    ', set);    // Set { 2, 6 }
console.log('String: ', string); // Set { 2, 6 }
