const themeBuilder = require('../../../src/app.js');

describe('App', () => {
  it('should throw an error if missing processor for "custom" format', () => {
    const format = 'custom';

    expect(() => {
      themeBuilder({ format });
    }).toThrow(new Error(`Missing processor for "${format}" format`));
  });
});
