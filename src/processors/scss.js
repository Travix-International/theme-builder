'use strict';
function recursionCompile(obj, path) {
  const keys = Object.keys(obj);
  let result = [];

  keys.forEach((key) => {
    if (typeof obj[key] === 'string') {
      result.push(`$${path}-${key}: ${obj[key]};`);
      return;
    }

    const children = recursionCompile(obj[key], path ? `${path}-${key}` : key);
    result = result.concat(children);
  });

  return result;
}

const ScssProcessor = {
  compile(obj, prefix) {
    return recursionCompile(obj, prefix);
  }
};

module.exports = ScssProcessor;
