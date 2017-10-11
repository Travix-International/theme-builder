const jsFlat = require('./jsflat');

function dictionaryToCssVars(obj) {
  return [
    ':root {',
    ...Object.keys(obj).map(key => `\t--${key}: ${obj[key]};`),
    '}',
  ].join('\n');
}

const CssVarsProcessor = {
  compile(obj, path) {
    return dictionaryToCssVars(jsFlat.compile(obj, path));
  }
};

module.exports = CssVarsProcessor;
