const jsProcessor = require('../../../src/processors/js.js');
describe('JS process', () => {
  it('should process object', () => {
    const doc = {
      do: {
        some: {
          string: 'aaa',
          num: '12px',
          color: '#fff'
        }
      }
    };

    const result = jsProcessor.compile(doc);
    expect(result).toMatchSnapshot();
  });
});
