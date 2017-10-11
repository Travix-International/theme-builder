const js = require('./js');

function recursionCompile(obj, path) {
  return Object.keys(obj).reduce((result, key) => {
    const keyAtPath = path ? `${path}-${key}` : key;
    return Object.assign(result,
      typeof obj[key] === 'string'
        ? { [keyAtPath]: obj[key] }
        : recursionCompile(obj[key], keyAtPath)
      );
  }, {});
}

const JsFlatProcessor = {
  compile(obj, path) {
    return recursionCompile(
      js.compile(obj),
      path
    );
  }
};

module.exports = JsFlatProcessor;
