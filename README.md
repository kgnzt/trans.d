# Transducers in Javascript.

## About

## Features

  * Container remapping.
  * Transform export shorthands.
  * Transform library.

## Requirements
  - Node.js
  - NPM

## Installation

To install inside a project, run:

    npm install trans.d --save

## API

### transd (root package import)

  * transd
    * `.transduce(transform, build, state, iterable)` transform iterable into state using build
    * `.into(transform, state, iterable)` transform iterable into state
    * `.sequence(transform, iterable)` transform iterable into a new iterable of iterable type
    * `.transducer (Object)` see transd.transducer
    * `.transform (Object)` see transd.transform

### transducer

  * transd.transducer
    * `.take(count)`
    * `.drop(count)`
    * `.map(iteratee)`
    * `.filter(predicate)`
    * `.identity(input)`
    * `.negate(input)`

### transform

Also exports all global Math functions as map transforms.

  * transd.transform
    * `.compose(transducers)`
    * `.export(transforms)`
    * `.removeOdd(input)`
    * `.removeEven(input)`
    * `.square(input)`

## Example

Examples of how to best use the API can be found in ./example.

## Usage

Example:

    const transd = require('transd');

    const transform = functional.compose(
      transd.identity,
      transd.map(x => x + 1),
      transd.map(x => x * 3),
      transd.filter(x => (x % 2) === 0),
      transd.map(functional.counter((iteration, value) => {
        return [iteration, value];
      }))
    );

    const map = new Map(),
          iterator = [10, 9, 41, 3, 8];

    const result = transduce.into(transform, map, iterator);

    console.log(result); // Map { 0 => 30, 1 => 126, 2 => 12 }


Trans.d supports out of box least suprise remapping.

    const iterable = {
            alpha: 1,
            beta: 2,
            gamma: 5,
            delta: 5
          },
          initial = [],
          transform = transd.compose(
            transd.map(x => x + 1),
            transd.filter(x => x % 2 === 0),
          );
    
    const array = transd.into(transform, [], iterable);
          object = transd.into(transform, {}, iterable);
          map = transd.into(transform, new Map(), iterable);
          set = transd.into(transform, new Set(), iterable);

    console.log(array);  // [2, 6]
    console.log(object); // { alpha: 2, gamma: 6 }
    console.log(map);    // Map { alpha => 2, gamma => 6 }
    console.log(set);    // Set { 2, 6 }

## Contributing

Always welcome to add, just open a PR.

## Testing

Testing requires:

  - Make
  - Grunt

Install node modules locally by running:

    npm install

Then run a command below based on what test suite you need to run.

### Lint (Syntax)

    make lint

### Unit

    make unit-test

### All

    make test

## Contributing

Just open a PR.
