'use strict';

const transd = require('../'),
      transform = require('./transform_exports');

/**
 * Sample data 1.
 */
const s1 = [1, 2, 5, 12, 34];

const s1Result = transform.sequence.increment(s1);

console.log(s1Result);

/**
 * Sample data 2.
 */
const s2 = {
  joe: 22,
  john: 13.2,
  marry: 11.2,
  susan: 93.2
};

const s2Map = transform.into(new Map()).identity(s2),
      s2Array = transform.into([]).identity(s2),
      s2Set = transform.into(new Set()).identity(s2);

console.log(s2Map);
console.log(s2Array);
console.log(s2Set);

/**
 * Sample data 3.
 */
const s3 = {
  joe: 22,
  john: 13.2,
  marry: 11.2,
  susan: 93.2,
  danny: 93,
  alice: 12,
  joe: 12
};

const s3Map = transform.into(new Map()).complex(s3),
      s3Array = transform.into([]).complex(s3),
      s3Set = transform.into(new Set()).complex(s3);

console.log(s3Map);
console.log(s3Array);
console.log(s3Set);
