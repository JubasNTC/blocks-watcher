'use strict';

const incrementHex = (hexValue) => (parseInt(hexValue, 16) + 1).toString(16);

module.exports = {
  incrementHex,
};
