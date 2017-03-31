/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const lodashMerge = require('lodash.merge');
const yamlParser = require('yaml-ast-parser');
const fs = require('fs');

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

function getASTValue(obj, curr = {}) {
  if (obj.mappings) {
    obj.mappings.forEach(({ key, value }) => {
      if (!value.mappings || !value.mappings.length) {
        if (value.referencesAnchor) {
          curr[key.value] = `*${value.referencesAnchor}`;
          return;
        }
        if (value.anchorId) {
          curr[key.value] = `&${value.anchorId} ${value.rawValue}`;
          return;
        }
        curr[key.value] = value.rawValue;
      } else {
        curr[key.value] = getASTValue(value, {});
      }
    });
  }

  return curr;
}

function buildYamlJson(ast) {
  if (ast.errors && ast.errors.length) {
    ast.errors.forEach(err => console.error(err.reason));
    throw new Error('There are some errors in AST, please contact developer');
  }

  return ast.items ? ast.items.map(astItem => getASTValue(astItem)) : [getASTValue(ast, {})];
}

function readFiles(paths) {
  return Promise.resolve(paths.map(themePath => fs.readFileSync(themePath, 'utf-8')).filter(Boolean));
}

function parseYaml(content) {
  return yamlParser.safeLoad(content);
}

module.exports = {
  buildYamlJson,
  compileJsonToYaml,
  concatYamlData,
  parseYaml,
  readFiles
};
