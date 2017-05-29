'use strict';

const transd = require('../');

module.exports = transd.transform.export({
  increment: transd.map(x => x + 1),

  removeOdd: transd.map(x => x % 2 === 0),

  identity: transd.identity,

  log: transd.transform.log,

  complex: transd.compose(
    transd.transform.log,
    transd.transform.square,
    transd.transform.increment,
    transd.transform.decrement,
    transd.take(2)
  )
});
