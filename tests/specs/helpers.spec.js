import helpers from '../../src/helpers';

describe('Helpers', () => {
  describe('rgb', () => {
    it('should convert a hex color value into rgba', () => {
      expect(helpers.rgb('#FFFFFF')).toEqual('255, 255, 255');
    });

    it('should handle shorthand hex color definitions correctly', () => {
      expect(helpers.rgb('#F00')).toEqual('255, 0, 0');
    });

    it('should handle other kinds of colors', () => {
      expect(helpers.rgb('#99424f')).toEqual('153, 66, 79');
    });
  });

  describe('rgba', () => {
    it('should convert a hex color value into rgba', () => {
      expect(helpers.rgba('#FFFFFF')).toEqual('rgba(255, 255, 255, 1)');
    });

    it('should append use passed opacity', () => {
      expect(helpers.rgba('#00FF00', 0.5)).toEqual('rgba(0, 255, 0, 0.5)');
    });
  });
});
