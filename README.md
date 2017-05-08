# Transducers in Javascript.

## About

## Requirements
  - Node.js
  - NPM

## Installation

To install inside a project, run:

    npm install trd --save

## Example

Be sure to check the examples in /example.

## Usage

Example:

    const trd = require('trd');

    const transform = functional.compose(
      transducer.identity,
      transducer.map(x => x + 1),
      transducer.map(x => x * 3),
      transducer.filter(x => (x % 2) === ),
      transducer.map(functional.counter((iteration, value) => {
        return [iteration, value];
      }))
    );

    const map = new Map(),
          iterator = [10, 9, 41, 3, 8];

    const result = transduce.into(transform, map, iterator);

    console.log(result); // Map { 0 => 30, 1 => 126, 2 => 12 }

const result = transduce.into(transform, map, iterator);


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

## Design

## Contributing

Always welcome to add, just open a PR.

## Testing

### Lint

### Unit

### Integration

### Validation

### Version testing

### All

## Debugging
