function hexToRgb(hexStr) {
  const hex = hexStr.replace(/^#/, '');
  const fullHex = hex.length === 3
    ? `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
    : hex;

  const num = parseInt(fullHex, 16);
  // eslint-disable-next-line no-bitwise, no-mixed-operators
  return [num >> 16, num >> 8 & 255, num & 255];
}

function rgba(hexStr = '', opacity = 1) {
  const values = hexToRgb(hexStr).concat(opacity).join(', ');
  return `rgba(${values})`;
}

module.exports = {
  rgba,
};
