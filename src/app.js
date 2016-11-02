/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const yaml = require('js-yaml');
const js = require('./processors/js');
const scss = require('./processors/scss');

const defaultProcessors = {
  js,
  scss
};

module.exports = function app(themeYaml, format, config = {}) {
  let processors = defaultProcessors;
  if (config.processors) {
    processors = Object.assign({}, config.processors, defaultProcessors);
  }

  if (!processors[format]) {
    throw new Error(`Missing processors for "${format}" format`);
  }

  try {
    const processor = processors[format];
    const jsonTheme = yaml.safeLoad(themeYaml);
    return processor.compile(jsonTheme, config.prefix ? config.prefix : '');
  } catch (error) {
    console.warn(`Failed to process theme with ${format} format. Reason:`);
    console.warn(error);
  }

  return null;
};
