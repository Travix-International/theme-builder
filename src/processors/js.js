const template = require('lodash.template');
const helpers = require('../helpers');

/**
 * Simple check if passed argument is object or array
 *
 * @param {any}
 */
function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Apply transform on primitive values (strings, numbers)
 *
 * @param {Object|Array} value
 * @param {Object} local variables to pass into transformation
 */
function applyTransforms(value, obj) {
  return template(value)(obj);
}

/**
 * This function will walk a object tree and apply transformations on it
 *
 * @param {Object} obj
 * @param {Object} the parent object
 */
function parseExpressions(obj, proto) {
  const parsedObj = Object.assign(Object.create(proto), obj);
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const fn = isObject(value) ? parseExpressions : applyTransforms;
    parsedObj[key] = fn(value, parsedObj);
  });

  return parsedObj;
}

const JsProcessor = {
  compile(obj) {
    return parseExpressions(obj, helpers);
  }
};

module.exports = JsProcessor;
