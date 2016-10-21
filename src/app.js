const path = require('path');
const yaml = require('js-yaml');

module.exports = function app(themeYaml, format, opt = {}) {
  try {
    const processor = require(path.join(__dirname, 'processors', format));
    const jsonTheme = yaml.safeLoad(themeYaml);
    return processor.compile(jsonTheme, opt.prefix ? opt.prefix : '');
  } catch (error) {
    console.log('Failed to process theme:');
    console.log(error);
  }

  return null;
};
