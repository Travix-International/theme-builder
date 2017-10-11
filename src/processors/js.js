const template = require('lodash.template');

function parseExpressions(obj) {
  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    return Object.assign(result, {
      [key]: typeof value === 'string'
        ? template(value)(obj)
        : parseExpressions(value)
    });
  }, {});
}

const JsProcessor = {
  compile(obj) {
    return parseExpressions(obj);
  }
};

module.exports = JsProcessor;
