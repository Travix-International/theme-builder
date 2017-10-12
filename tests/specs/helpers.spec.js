import helpers from '../../src/helpers';

describe('Helpers: rgba', () => {
  it('should convert a hex color value into rgba', () => {
    expect(helpers.rgba('#FFFFFF')).toEqual('rgba(255, 255, 255, 1)');
  });

  it('should handle shorthand hex color definitions correctly', () => {
    expect(helpers.rgba('#F00')).toEqual('rgba(255, 0, 0, 1)');
  });

  it('should append use passed opacity', () => {
    expect(helpers.rgba('#00FF00', 0.5)).toEqual('rgba(0, 255, 0, 0.5)');
  });

  it('should handle other kinds of colors', () => {
    expect(helpers.rgba('#99424f', 1)).toEqual('rgba(153, 66, 79, 1)');
  });

  it('Handles undefined color as black', () => {
    expect(helpers.rgba(undefined, 1)).toEqual('rgba(0, 0, 0, 1)');
  });
});
