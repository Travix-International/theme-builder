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

module.exports = function themeBuilder(config) {
  const builderConfig = Object.assign({}, defaultConfig, config);
  const { processors, prefix, format } = builderConfig;

  const processor = processors[format];

  if (!processor) {
    throw new Error(`Missing processor for "${format}" format`);
  }

  return {
    merge(yamlFiles) {
      return yamlUtils.readFiles(yamlFiles)
        .then(yamlUtils.concatYamlData)
        .then(yamlUtils.parseYaml)
        .then(yamlUtils.buildYamlJson)
        .then(yamlUtils.compileJsonToYaml);
    },
    build(yamlFiles) {
      let promise;
      if (typeof yamlFiles === 'string') {
        promise = this.merge([yamlFiles]);
      } else {
        promise = this.merge(yamlFiles);
      }

      return promise
        .then(themeYaml => processor.compile(jsYaml.safeLoad(themeYaml), prefix));
    },
    watch(files, callback) {
      if (typeof callback !== 'function') {
        throw new Error('callback is required!');
      }
      if (typeof files === 'string') {
        files = [files];
      }

      files.map((yamlFile) => {
        return fs.watchFile(yamlFile, (curr, prev) => {
          console.log(`[theme-builder] Detected changes on ${yamlFile}`); // eslint-disable-line
          console.log(`[theme-builder] rebuilding start`); // eslint-disable-line
          this.build(files)
            .then((content) => {
              console.log(`[theme-builder] rebuilding end`); // eslint-disable-line
              callback(content, curr, prev);
            });
        });
      });
    }
  };
};
