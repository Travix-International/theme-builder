const jsFlat = require('./jsflat');

function dictionaryToSass(obj) {
  return Object.keys(obj).map(key => `$${key}: ${obj[key]};`).join('\n');
}

const ScssProcessor = {
  compile(obj, path) {
    return dictionaryToSass(jsFlat.compile(obj, path));
  }
};

module.exports = ScssProcessor;
