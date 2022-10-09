const pipe = (...arr) => {
  return (name) => {
    return arr.reduce((prev, item) => {
      return item(prev);
    }, name);
  };
};
const curryPart = (fn, arity = fn.length) => {
  return (function nextCurried(prevArgs) {
    return function curried(nextArgs) {
      const args = [...prevArgs, nextArgs];
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
};
const partial = (fn, firstArg) => {
  return (...lastArgs) => {
    return fn(firstArg, ...lastArgs);
  };
};
