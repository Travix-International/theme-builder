/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import yaml from 'js-yaml';
import js from './processors/js';
import scss from './processors/scss';

let processors = {
  js,
  scss,
  missing: { compile: () => null }
};

module.exports = function app(themeYaml, format, config = {}) {
  if (config.processors) {
    processors = Object.assign({}, config.processors, processors);
  }

  try {
    const processor = processors[format] || processors.missing;
    const jsonTheme = yaml.safeLoad(themeYaml);
    return processor.compile(jsonTheme, config.prefix ? config.prefix : '');
  } catch (error) {
    console.warn('Failed to process theme:');
    console.warn(error);
  }

  return null;
};
