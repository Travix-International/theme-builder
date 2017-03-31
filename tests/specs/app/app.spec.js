const themeBuilder = require('../../../src/app.js');
const yaml = require('js-yaml');
const jest = require('jest');
const js = require('../../../src/processors/js');

describe('App', () => {
  it('should throw an error if missing processor for "custom" format', () => {
    const format = 'custom';

    expect(() => {
      themeBuilder({ format });
    }).toThrow(new Error(`Missing processor for "${format}" format`));
  });

  //
  // it('should process yaml file with processor', () => {
  //   const result = app('some.yaml', 'js');
  //   expect(result).toMatchSnapshot();
  // });
  //
  // it('should process yaml file with processor and extend with default yaml', () => {
  //   yaml.safeLoad = (name) => {
  //     if (name === '_default.yaml') {
  //       return {
  //         default: 'test',
  //         do: {
  //           deep: 'workAsWell'
  //         }
  //       };
  //     }
  //
  //     return doc;
  //   };
  //   const result = app('some.yaml', 'js', { defaultThemeYaml: '_default.yaml' });
  //   expect(result).toMatchSnapshot();
  // });
  //
  // it('should throw an error in case of missing processor', () => {
  //   expect(() => {
  //     app('some.yaml', 'no-processor');
  //   }).toThrowError('Missing processors for "no-processor" format');
  // });
  //
  // it('should return null in case of error in processing yaml', () => {
  //   yaml.safeLoad = () => {
  //     throw new Error('fakeError');
  //   };
  //   const result = app('some.yaml', 'js');
  //   expect(result).toMatchSnapshot();
  // });
  //
  // it('should return null in case of error in processing JS', () => {
  //   js.compile = () => {
  //     throw new Error('fakeError');
  //   };
  //   const result = app('some.yaml', 'js');
  //   expect(result).toMatchSnapshot();
  // });
  //
  // it('should extend processors list with list from config and use custom processors', () => {
  //   const config = {
  //     processors: {
  //       custom: {
  //         compile(data) {
  //           return Object.keys(data);
  //         }
  //       }
  //     }
  //   };
  //
  //   const result = app('some.yaml', 'custom', config);
  //   expect(result).toMatchSnapshot();
  // });
});
