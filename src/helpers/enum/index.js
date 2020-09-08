const dfaState = require("./dfaState");
const tokenType = require("./tokenType");

module.exports = {
  ...dfaState,
  ...tokenType,
};
