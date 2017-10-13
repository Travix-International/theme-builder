const jsProcessor = require('../../../src/processors/js.js');

describe('JS process', () => {
  it('should process object', () => {
    const doc = {
      another: {
        something: 'bbb'
      },
      do: {
        some: {
          string: 'aaa',
          num: '12px',
          color: '#fff',
          // eslint-disable-next-line no-template-curly-in-string
          template: '${color}${some.string}${another.something}'
        }
      }
    };

    const result = jsProcessor.compile(doc);
    expect(result).toMatchSnapshot();
  });
});
