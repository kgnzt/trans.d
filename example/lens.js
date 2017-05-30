'use strict';

const transd = require('../'),
      Functional = require('../src/functional'); // export via transd

/**
 * Convert string to uppercase.
 *
 * @param {string}
 * @return {string}
 */
function toUpper(string) {
  return string.toUpperCase();
}

/**
 * Adjust score.
 */
const adjustScore = transd.compose(
  transd.map(x => x + 5),
  transd.map(x => x / 2)
); 

const transform = transd.compose(
        transd.lens('score', adjustScore),
        transd.lens('name', transd.map(toUpper)),
        transd.lens('items', transd.filter(Functional.isNotIdentical('wand'))),
        transd.filter(Functional.pipe(Functional.access('score'), Functional.greaterThan(15)))
      ),
      input = [{
        name: 'john',
        score: 23,
        items: ['hat', 'shoe', 'wand']
      }, {
        name: 'alice',
        score: 72,
        items: ['dog', 'shoe']
      }, {
        name: 'greg',
        score: 34,
        items: ['wand', 'cat']
      }, {
        name: 'candy',
        score: 18,
        items: ['hat', 'wand', 'shoe']
      }];

const output = transd.sequence(transform, input);

console.log(output);
