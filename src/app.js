const jsYaml = require('js-yaml');
const yamlUtils = require('./yamlUtils');
const js = require('./processors/js');
const scss = require('./processors/scss');
const fs = require('fs');

const defaultConfig = {
  processors: {
    js,
    scss
  },
  prefix: '',
  format: 'scss'
};

function readFiles(paths) {
  return Promise.resolve(paths.map(themePath => fs.readFileSync(themePath, 'utf-8')).filter(Boolean));
}

module.exports = function themeBuilder(config) {
  const builderConfig = Object.assign({}, defaultConfig, config);
  const { processors, prefix, format } = builderConfig;

  const processor = processors[format];

  if (!processor) {
    throw new Error(`Missing processor for "${format}" format`);
  }

  return {
    merge(files) {
      return readFiles(files)
        .then(yamlUtils.concatYamlData)
        .then(yamlUtils.parseYaml)
        .then(yamlUtils.buildYamlJson)
        .then(yamlUtils.compileJsonToYaml);
    },
    build(themeYaml) {
      return processor.compile(jsYaml.safeLoad(themeYaml), prefix);
    }
  };
};
