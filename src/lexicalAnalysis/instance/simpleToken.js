const { EmDfaState } = require("../../helpers/enum");

exports.SimpleToken = function (options = {}) {
  const _opts = Object.assign(
    {
      type: EmDfaState.Initial,
      value: "",
    },
    options
  );

  this.type = _opts.type;
  this.value = _opts.value;
};
