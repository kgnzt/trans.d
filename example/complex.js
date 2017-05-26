'use strict';

const transd = require('../'),
      { transducer } = transd,
      math = require('mathjs');

const input = [1, 4, 3, 2];
const lodash = require('lodash');

//const input = [1, 4, 3, 2] -> [Number, Complex, Number, Complex]

// change in x = 1, N = 4

// Find count N of iterable, second repeat iterable N times,
// calculate dft for each.

const TWO_PI = (Math.PI * 2);

const dork = transd.compose(
  transd.buffer(4),
  transd.map(lodash.flatten),
  transd.enumerate,
  transd.map((iteration, sequence) => {
    return [iteration, sequence];
  }),
  transd.map(x => {
    console.log(x);
    return x;
  })
  /*
  transd.map(seq => {
    const n = seq.length;

    let result = [];

    for (let k = 0; k < n; k++) {
      let sumreal = 0;
      let sumimag = 0;

      for (let t = 0; t < n; t++) {
        let angle = 2 * Math.PI * t * k / n;
        sumreal += seq[t] * Math.cos(angle) + 0 * Math.sin(angle);
        sumimag += -seq[t] * Math.sin(angle) + 0 * Math.cos(angle);
      }

      result.push(math.complex(Math.round(sumreal), Math.round(sumimag)));
    }

    return result;
  }),
  */
  //transd.cat
);

const sum = transd.sequence(dork ,input);
console.log('coplex: ', sum);

/*
transd.compose(
  transform.reduce((state, input) => {
    return state.push(input);
  }, [])
  transform.map((x, i) => {

    const ((Math.PI * 2) / 4) * 1 * i;


    return Math.pow(Math.E, (-i * ((2 * Math.PI) / 4) * i)
  })


const xform = transd.compose(
        transform.each(
          transd.compose({

          });
        ),
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
*/
