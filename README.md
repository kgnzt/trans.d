# trans.d: Transducer Framework for Javascript.

## About

A least-suprise, least-configuration, and most-composability transducer library
for ES6 Javascript.

## Features

  * Container remapping.
  * Transform export shorthands.
  * Transform library.
  * Support for n-ary input transforms.
  * Support for:
    - Array
    - Object
    - String
    - Map
    - Set

## Requirements
  - Node.js
  - NPM

## Installation

To install inside a project, run:

    npm install trans.d --save

## API

### transd (root package import)

  * transd
    * `.transduce(transform, step, state, iterable)` transform iterable into state using step
    * `.into(transform, state, iterable)` transform iterable into state
    * `.sequence(transform, iterable)` transform iterable into a new iterable of iterable type
    * `.transducer (Object)` see transd.transducer
    * `.transform (Object)` see transd.transform

### transducer

  * transd.transducer
    * `.take(count)` keep the first count inputs
      * `count (number)` number of inputs to keep
    * `.drop(count)` remove the first count inputs
      * `count (number)` number of inputs to remove
    * `.map(iteratee)` evaluate the current value through iteratee
      * `iteratee (function)`
    * `.filter(predicate)` keep the current value if predicate evaluates to true
      * `predicate (function)` 
    * `.identity(input)` given input, input is returned
      * `input (mixed)`
    * `.negate(input)` take the complement of the input
      * `input (boolean)`

### transform

Also exports all global Math functions as map transforms.

  * transd.transform
    * `.compose(transducers)`
      * `transducers (array[function])`
    * `.export(transforms)`
      * `transforms (object)`
    * `.removeOdd(input)`
      * `input (number)`
    * `.removeEven(input)`
      * `input (number)`
    * `.square(input)`
      * `input (number)`

## Example

Examples of how to best use the API can be found in ./example.

## Usage

Example:

    const { transform,
            transducer,
            sequence,
            into } = require('transd');

    const xform = transform.compose(
      transducer.identity,
      transducer.map(x => x + 1),
      transducer.map(x => x * 3),
      transducer.filter(x => (x % 2) === 0)
    );

    const result = sequence(xform, [10, 9, 41, 3, 8]);

    console.log(result); // [30, 126, 12]


Trans.d supports out of box least suprise remapping.

    // ... continued
    const iterable = {
            alpha: 1,
            beta: 2,
            gamma: 5,
            delta: 5
          };
    
    const object = into(xform, {}, iterable), // alias: for sequence(xform, iterable);
          array = into(xform, [], iterable),
          map = into(xform, new Map(), iterable),
          set = into(xform, new Set(), iterable);

    console.log(array);  // [2, 6]
    console.log(object); // { alpha: 2, gamma: 6 }
    console.log(map);    // Map { alpha => 2, gamma => 6 }
    console.log(set);    // Set { 2, 6 }

If you export your custom transforms via transform.export(transforms):

    const transform = require('./my-transforms'); // see ./example/transform_exports.js

    const r1 = transform.sequence.example(iterable),
          r2 = transform.into({}).example(iterable),
          r3 = transform.into(new Map()).example(iterable),
          r4 = transform.into(new Set()).example(iterable);

    console.log(r1); // [2, 6]
    console.log(r2); // { '0': 2, '1': 6 }
    console.log(r3); // Map { 0 => 2, 1 => 6 }
    console.log(r4); // Set { 2, 6 }

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
