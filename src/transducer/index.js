'use strict';

const lodash      = require('lodash'),
      Helper      = require('../helper'),
      Iterable    = require('../iterable'),
      Functional  = require('../functional'),
      { wrap,
        unwrap,
        transducer,
        forward } = require('./api');

/**
 * Stateful transducer that prepends the current iteration to inputs.
 *
 * @return {function}
 */
function enumerate() {
  return transducer((step, state, ...inputs) => {
    const [ output, iteration ] = unwrap(state, 0);
  
    return wrap(step(output, iteration, ...inputs), iteration + 1);
  });
};

/**
 * Includes the first N inputs.
 *
 * @param {number} count
 * @return {function}
 */
function take(count) {
  return transducer((step, state, ...inputs) => {
    const [ output, iteration ] = unwrap(state, 0);

    if (iteration >= count) {
      return wrap(state, iteration + 1);
    }

    return wrap(step(output, ...inputs), iteration + 1);
  });
}

/**
 * Removes the first N inputs.
 *
 * @param {number} count
 * @return {function}
 */
function drop(count) {
  return transducer((step, state, ...inputs) => {
    const [ output, iteration ] = unwrap(state, 0);

    if (iteration < count) {
      return wrap(state, iteration + 1);
    }

    return wrap(step(output, ...inputs), iteration + 1);
  });
}

/**
 * Iterates using an iterable updating state with each result.
 *
 * TODO: move to functional, can we use reduce in tranduce with iterable spread?
 *
 * @param {function} reducer
 * @param {mixed} accumulator
 * @param {Iterable} iterable
 * @return {Iterable} mixed
 */
function reduce(reducer, state, iterable) {
  for (let input of iterable) {
    state = reducer(state, input);
  }

  return state;
}

/**
 * Evaluates iteratee with the initial input.
 *
 * @param {function} iteratee
 * @return {function} Cat transducer.
 */
function cat(step) {
  return (state, ...input) => {
    return reduce(step, state, ...input);
  };
}

/**
 * Evaluates iteratee with the initial input.
 *
 * @param {function} iteratee
 * @return {function} Map transducer.
 */
function map(iteratee) {
  return step => {
    return (state, ...inputs) => {
      return step(state, ...(forward(inputs, iteratee(...inputs))));
    };
  };
}

// TODO: unit-test to see if step() needs a forward call for filter and dedupe...

/**
 * Includes inputs where the predicate returns true.
 *
 * @param {function} predicate
 * @return {function} Filter transducer.
 */
function filter(predicate) {
  return step => {
    return (state, ...inputs) => {
      return predicate(...inputs) ? step(state, ...inputs) : state;
    };
  };
}

/**
 * Stateful transducer that removes duplicate inputs.
 *
 * @return {function} Dedupe transducer.
 */
function dedupe() {
  const set = new Set();

  return step => {
    return (state, ...inputs) => {
      state = set.has(...inputs) ? state : step(state, ...inputs);

      set.add(...inputs);

      return state;
    };
  };
}

/**
 * Stateful transducer that adds additional input between each output.
 *
 * @return {function} Interpose transducer.
 */
function interpose(...interpose) {
  let iteration = 0;

  return step => {
    return (state, ...inputs) => {
      if (iteration !== 0) {
        state = step(state, ...interpose);
      }

      iteration += 1;

      return step(state, ...inputs);
    };
  };
}

/**
 * Stateful transducer that curries extra inputs.
 *
 * @todo: unit-test
 *
 * @param {function} step
 * @return {function}
 */
function curry(...additional) {
  return (state, ...inputs) => {
    return step(state, ...(inputs.concat(additional)));
  };
}

/**
 * Repeats input.
 *
 * @param {function} step
 * @return {function}
 */
function repeat(count) {
  return step => {
    return (state, ...inputs) => {
      return Functional.times(count, () => step(state, ...inputs));
    };
  };
}

/**
 * Transducer to buffer input.
 *
 * @param {function} step
 * @return {function}
 */
function buffer(size) {
  return transducer((step, state, ...inputs) => {
    const [ output, { iteration, buffer } ] = unwrap(state, {
      iteration: 0,
      buffer: []
    });
  
    if (iteration < size) {
      buffer.push(inputs);
    }
  
    if (iteration === size - 1) {
      return wrap(step(output, buffer), {
        iteration: 0,
        buffer: []
      });
    }
  
    return wrap(output, { buffer: buffer, iteration: iteration + 1 });
  });
}

/**
 * Stateless transducer that reverses input sequence.
 *
 * @param {function} step
 * @return {function}
 */
function reversed(step) {
  return (state, ...inputs) => {
    return step(state, ...inputs.reverse());
  };
}

/**
 * Stateless transducer that swaps two elements in an input sequence.
 *
 * @param {function} step
 * @return {function}
 */
function swap(a, b) {
  return step => {
    return (state, ...inputs) => {
      return step(state, ...Helper.swap(inputs, a, b));
    };
  };
}

/**
 * Transducer used to adjust associative container keys.
 *
 * @return {function} Rekey transducer.
 */
function rekey(iteratee) {
  return step => {
    return (state, ...inputs) => {
      return step(state, ...(Helper.swapAdjust(inputs, 0, 1, iteratee)));
    };
  };
}

module.exports = {
  rekey,
  reversed,
  swap,
  enumerate,
  dedupe,
  interpose,
  drop,
  repeat,
  buffer,
  cat,
  filter,
  identity: Functional.identity,
  map,
  negate: Functional.negate,
  take
};
