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
 * Evaluates iteratee with the initial input.
 *
 * @param {function} iteratee
 * @return {function} Cat transducer.
 */
function cat(step) {
  return (state, ...input) => {
    return Functional.reduce(step, state, ...input);
  };
}

/**
 * Evaluates iteratee with the initial input.
 *
 * @param {function} iteratee
 * @return {function} Map transducer.
 */
function map(iteratee) {
  return transducer((step, state, ...inputs) => {
    return step(state, ...(forward(inputs, iteratee(...inputs))));
  });
}

/**
 * Includes inputs where the predicate returns true.
 *
 * @param {function} predicate
 * @return {function} Filter transducer.
 */
function filter(predicate) {
  return transducer((step, state, ...inputs) => {
    return predicate(...inputs) ? step(state, ...inputs) : state;
  });
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
 * Stateful transducer that adds additional inputs between each output.
 *
 * @param {...mixed}
 * @return {function}
 */
function interpose(...interpose) {
  return transducer((step, state, ...inputs) => {
    let [ outter, iteration ] = unwrap(state, 0);

    if (iteration !== 0) {
      outter = step(outter, ...interpose)
    }

    return wrap(step(outter, ...inputs), iteration + 1);
  });
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
  return transducer((step, state, ...inputs) => {
    return Functional.times(count + 1, () => step(state, ...inputs));
  });
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
  return transducer((step, state, ...inputs) => {
    return step(state, ...Helper.swap(inputs, a, b));
  });
}

/**
 * Transducer used to adjust associative container keys.
 *
 * @return {function} Rekey transducer.
 */
function rekey(iteratee) {
  return transducer((step, state, ...inputs) => {
    return step(state, ...(Helper.swapAdjust(inputs, 0, 1, iteratee)));
  });
}

module.exports = {
  buffer,
  cat,
  dedupe,
  drop,
  enumerate,
  filter,
  identity: Functional.identity,
  interpose,
  map,
  negate: Functional.negate,
  rekey,
  repeat,
  reversed,
  swap,
  take
};
