![tran.d javascript transducers](/asset/logo.png?raw=true "trans.d javascript transducers.")

# trans.d: Transducer Framework for Javascript.

## About

A least-suprise, least-configuration, transducer framework for Javascript with an
eye towards real-world use cases.

## Features

  * Input type remapping.
  * N-ary input transforms.
  * Early termination.
  * Transform library.
  * Transform shorthand notation.
  * Configurable. (see transd.defaults)
    - Custom type support.
    - Built-in type behavior overriding (transduce, into, sequence).
  * Support for:
    - Array
    - Object
    - String
    - Number
    - Map
    - Set
    - Generator (Iterator)

## Requirements
  - Node.js
  - NPM

## Installation

To install inside a project, run:

    npm install trans.d --save

## API

### transd (root package import)

  * transd
    * `.transduce(transform, step, output, input)` transform input to output by reducing via step
      * `transform (function)`
      * `step (function)`
      * `output (Mixed)`
      * `input (Iterable)`
    * `.into(transform, output, input)` transform input into output
      * `transform (function)`
      * `output (Mixed)`
      * `input (Iterable)`
    * `.sequence(transform, input)` transform input into a new output of input's type
      * `transform (function)`
      * `input (Iterable)`
    * `.defaults(options = {})` generate a reconfigured transd library
      * `options (object)`
        - `.type (object)` define custom type handling
          - `.[YourType] (object)` 
            - `.input (function)` 
            - `.step (object)` 
              - `.[OutputType] (function)` 
            - `.output (function)` 
    * `.transducer (Object)` see transd.transducer
    * `.api (Object)` see transd.api
    * `.transform (Object)` see transd.transform

### transducer

Contains a collection of transducers for writing transforms. 

  * transd.transducer
    * `.buffer(size)` buffers input sequence to size number of iterations
    * `.cat()` concat input sequence
    * `.dedupe()` remove duplicates
    * `.drop(count)` remove the first count inputs
      * `count (number)` number of inputs to remove
    * `.enumerate()` prepend current iteration to input sequence
    * `.filter(predicate)` keep the current value if predicate evaluates to true
      * `predicate (function)` 
    * `.identity(input)` given input, input is returned
      * `input (mixed)`
    * `.interpose(...inputs)` interpose additional inputs between each iteration
      * `inputs (...array)`
    * `.lens(path, transform)` transform a portion of the input
      * `path (path)` path to subsection to apply transform to for input
        * Supports: Object, Array
      * `transform (function)` transform subsection of input
    * `.map(iteratee)` evaluate the current value through iteratee
      * `iteratee (function)`
    * `.negate(input)` take the complement of the input
      * `input (boolean)`
    * `.peaks(cutoff)` removes non peak inputs values
      * `cutoff (number)`
    * `.rekey(iteratee)` adjust output keys
      * `iteratee (function)`
    * `.repeat(count)` repeat input sequence count times
      * `count (number)`
    * `.reverse` reverse input order
    * `.swap(a, b)` swap two inputs (input index start at 0)
      * `a (number)` input index
      * `b (number)` input index
    * `.take(count)` keep the first count inputs
      * `count (number)` number of inputs to keep

### api

The transducer API can be used to build additional transducers.

  * transd.api
    * `.complete(state)` returns the outter state called when chain completes
    * `.forward(inputs, value)` correctly forwards inputs in transducer chain
    * `.inner(state, value)` return the inner state
    * `.isWrapped(state)` determine if state is wrapped
    * `.outter(state)` return the outter state
    * `.transducer(transform)` create a transducer given a ternary transform
      * `transform (function(step, state, ...inputs))`
    * `.unwrap(state, value)` unwrap state into outter and inner
    * `.wrap(state, value)` wrap state in state wrapper

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

### Configuration

To reconfigure defaults or provide default support for custom types:

    module.exports = require('transd').defaults({
      type: {
        MyType: {
          step: { 
            MyType (accumulator, value, key) {
              return instance.inject(key, value);
            },
            Array (accumulator, value, key) {
              accumulator.push(value);
              return accumulator;
            }
          },
          output () {
            return new MyType();
          },
          input (instance) {
            return {
              [Symbol.iterator]: function* () { 
                for (let [key, value] of instance) {
                  yield [value, key];
                }
              }
            };
          }
        }
      }
    });

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
