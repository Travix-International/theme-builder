const scssProcessor = require('../../../src/processors/scss.js');
describe('SCSS processor', () => {
  let doc;

  beforeEach(() => {
    doc = {
      do: {
        some: {
          string: 'aaa',
          num: '12px',
          color: '#fff'
        }
      }
    };
  });

  it('should compile doc to SCSS format', () => {
    const result = scssProcessor.compile(doc);
    expect(result).toMatchSnapshot();
  });

  it('should compile doc to SCSS format with prefix', () => {
    const result = scssProcessor.compile(doc, 'pre');
    expect(result).toMatchSnapshot();
  });
});
