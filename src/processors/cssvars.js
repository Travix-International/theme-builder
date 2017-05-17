'use strict';

function recursionCompile(obj, path) {
  const keys = Object.keys(obj);
  let result = [];

  keys.forEach((key) => {
    if (typeof obj[key] === 'string') {
      result.push(`\t--${path}-${key}: ${obj[key]};`);
      return;
    }

    const children = recursionCompile(obj[key], path ? `${path}-${key}` : key);
    result = result.concat(children);
  });

  return result.join('\n');
}

const CssVarsProcessor = {
  compile(obj, path) {
    return `:root {\n${recursionCompile(obj, path)}\n}`;
  }
};

module.exports = CssVarsProcessor;
