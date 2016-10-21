const app = require('../../src/app.js');
const yaml = require('js-yaml');

describe('App', () => {
  it('should process yaml file with proper processor with prefix', () => {
    const doc = {
      do: {
        some: {
          string: 'aaa',
        }
      }
    };

    yaml.safeLoad = () => doc;
    const result = app('some.yaml', 'scss', {prefix: 'tx'});
    expect(result).toMatchSnapshot();
  });

  it('should process yaml file with processor', () => {
    const doc = {
      do: {
        some: {
          string: 'aaa',
        }
      }
    };

    yaml.safeLoad = () => doc;
    const result = app('some.yaml', 'js');
    expect(result).toMatchSnapshot();
  });

  it('should return null in case of missing processor', () => {

    yaml.safeLoad = () => {};
    const result = app('some.yaml', 'no-processor');
    expect(result).toBeNull();
  });
});
