const app = require('../../src/app.js');
const yaml = require('js-yaml');
let doc;

describe('App', () => {
  beforeEach(() => {
    doc = {
      do: {
        some: {
          string: 'aaa',
        }
      }
    };
    yaml.safeLoad = () => doc;
  });

  it('should process yaml file with proper processor with prefix', () => {
    const result = app('some.yaml', 'scss', { prefix: 'tx' });
    expect(result).toMatchSnapshot();
  });

  it('should process yaml file with processor', () => {
    const result = app('some.yaml', 'js');
    expect(result).toMatchSnapshot();
  });

  it('should return null in case of missing processor', () => {
    expect(() => {
      app('some.yaml', 'no-processor');
    }).toThrowError('Missing processors for "no-processor" format');
  });

  it('should extend processors list with list from config and use custom processors', () => {
    const config = {
      processors: {
        custom: {
          compile(data) {
            return Object.keys(data);
          }
        }
      }
    };

    const result = app('some.yaml', 'custom', config);
    expect(result).toMatchSnapshot();
  });
});
