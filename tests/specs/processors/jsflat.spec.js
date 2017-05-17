const jsflatProcessor = require('../../../src/processors/jsflat.js');

describe('JS Flat object processor', () => {
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

  it('should compile doc to JS Flat object format', () => {
    const result = jsflatProcessor.compile(doc);
    expect(result).toMatchSnapshot();
  });

  it('should compile doc to JS Flat object format with prefix', () => {
    const result = jsflatProcessor.compile(doc, 'pre');
    expect(result).toMatchSnapshot();
  });
});
