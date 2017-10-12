/**
 * Converts hex string into it's comma separated 0-255 values
 * Example: rgb('#FFF') => '255, 255, 255'
 *
 * @param {String} Hex value in the format of #FFF or #FFFFFF
 */
function rgb(hexStr) {
  const hex = hexStr.replace(/^#/, '');
  const fullHex = hex.length === 3
    ? `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
    : hex;

  const num = parseInt(fullHex, 16);
  // eslint-disable-next-line no-bitwise, no-mixed-operators
  return [num >> 16, num >> 8 & 255, num & 255].join(', ');
}

/**
 * Converts hex string and opacity pair into a proper rgba definition
 * Example: rgba('#FFF', 0.5) => 'rgba(255, 255, 255, 0.5)'
 *
 * @param {String} Hex value in the format of #FFF or #FFFFFF
 * @param {Number} Opacity from 0 to 1
 */
function rgba(hexStr, opacity = 1) {
  return `rgba(${rgb(hexStr)}, ${opacity})`;
}

module.exports = {
  rgb,
  rgba,
};
