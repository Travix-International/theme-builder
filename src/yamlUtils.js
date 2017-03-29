/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const lodashMerge = require('lodash.merge');
const yamlParser = require('yaml-ast-parser');

function buildYamlJson(ast) {
  if (!ast) {
    throw new Error('No AST found, please contact developer');
  }

  if (ast.errors && ast.errors.length) {
    ast.errors.forEach(err => console.error(err.reason));
    throw new Error('There are some errors in AST, please contact developer');
  }

  function getValue(obj, curr = {}) {
    if (obj.mappings && obj.mappings.length) {
      obj.mappings.forEach(({ key, value }) => {
        if (!value.mappings || !value.mappings.length) {
          if (value.referencesAnchor) {
            curr[key.value] = `*${value.referencesAnchor}`;
            return;
          }
          if (value.anchorId) {
            curr[key.value] = `&${value.anchorId} ${value.rawValue || value.value}`;
            return;
          }
          curr[key.value] = value.rawValue || value.value;
        } else {
          curr[key.value] = getValue(value, {});
        }
      });
    }

    return curr;
  }

  return ast.items ? ast.items.map(astItem => getValue(astItem)) : [getValue(ast, {})];
}

function compileJsonToYaml(yamlJson) {
  return yamlParser.dump(lodashMerge(...yamlJson)).replace(/'/g, '');
}

function concatYamlData(files) {
  return files.reduce((result, file) => {
    const fileUpd = file.split('\n').map(line => `  ${line}`);
    fileUpd.unshift('-');
    result += `${fileUpd.join('\n')}\n`;
    return result;
  }, '');
}

function parseYaml(content) {
  return yamlParser.safeLoad(content);
}


module.exports = {
  buildYamlJson,
  compileJsonToYaml,
  concatYamlData,
  parseYaml
};
