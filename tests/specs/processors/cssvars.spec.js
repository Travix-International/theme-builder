const cssvarsProcessor = require('../../../src/processors/cssvars.js');

describe('CSS Variables processor', () => {
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

  it('should compile doc to CSS Variables format', () => {
    const result = cssvarsProcessor.compile(doc);
    expect(result).toMatchSnapshot();
  });

  it('should compile doc to CSS Variables format with prefix', () => {
    const result = cssvarsProcessor.compile(doc, 'pre');
    expect(result).toMatchSnapshot();
  });
});
