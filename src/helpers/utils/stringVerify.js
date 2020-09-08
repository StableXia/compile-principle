const { SPECIAL_TOKEN } = require("../constant");

exports.isIdentifier = (char) => /[a-zA-Z_]/.test(char);

exports.isDigit = (char) => /\d/.test(char);

exports.isVariableStart = (char) =>
  isIdentifier(char) ||
  [SPECIAL_TOKEN.DOLLAR_SIGN, SPECIAL_TOKEN.UNDER_LINE].includes(char);
