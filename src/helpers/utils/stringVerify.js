const { SPECIAL_TOKEN } = require("../constant/specialToken");

exports.isDigit = (char) => /\d/.test(char);

exports.isAlpha = (char) => /[a-zA-Z]/.test(char);

exports.isVariableStart = (char) =>
  isAlpha(char) ||
  [SPECIAL_TOKEN.DOLLAR_SIGN, SPECIAL_TOKEN.UNDER_LINE].includes(char);
