/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import yaml from 'js-yaml';
import js from './processors/js';
import scss from './processors/scss';

let processors = {
  js,
  scss
};

module.exports = function app(themeYaml, format, config = {}) {
  if (config.processors) {
    processors = Object.assign({}, config.processors, processors);
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
