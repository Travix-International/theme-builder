/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const yaml = require('js-yaml');
const js = require('./processors/js');
const scss = require('./processors/scss');

const defaultProcessors = {
  js,
  scss
};

module.exports = function app(themeYaml, format, config = {}) {
  const processors = Object.assign({}, config.processors || {}, defaultProcessors);

  if (!processors[format]) {
    throw new Error(`Missing processors for "${format}" format`);
  }

  try {
    const jsonTheme = yaml.safeLoad(themeYaml);
    return processors[format].compile(jsonTheme, config.prefix ? config.prefix : '');
  } catch (error) {
    console.warn(`Failed to process theme with ${format} format. Reason:`);
    console.warn(error);
  }

  return null;
};
