const { EmDfaState } = require("../enum/dfaState");
const { EmTokenType } = require("../enum/tokenType");
const {
  isVariableStart,
  isDigit,
  isAlpha,
} = require("../../helpers/utils/stringVerify");
const { SPECIAL_TOKEN } = require("../../helpers/constant/specialToken");
const { SimpleToken } = require("./simpleToken");

const prototypeMap = {
  /**
   * 对源代码进行分词生成token列表
   * @param {string} sourceCode - 要解析的源代码
   */
  tokenize(sourceCode) {
    let state = EmDfaState.Initial;

    for (let char of sourceCode) {
      switch (state) {
        case EmDfaState.Initial:
          state = this.initToken(char);
          break;
        case EmDfaState.Identifier:
          break;
        case EmDfaState.Number:
          break;
        case EmDfaState.GT:
          break;
        case EmDfaState.EQ:
          break;
        case EmDfaState.GE:
          break;
        case EmDfaState.Plus:
          break;
        case EmDfaState.Minus:
          break;
        case EmDfaState.Multiply:
          break;
        case EmDfaState.Divide:
          break;
        default:
        // code...
      }
    }
  },

  /**
   *
   * @param {*} char
   */
  initToken(char) {
    if (this._tokenVal.length) {
      this._token.value = this._tokenVal;
      this._tokenList.push(this._token);
      this._token = { type: "", value: "" };
      this._tokenVal = "";
    }

    return this.getInitChState(char);
  },

  getInitChState(char) {
    let newState = DfaState.Initial;

    if (isDigit(char)) {
      newState = DfaState.NumberLiteral;
      this.changeTokenType(TokenType.NumberLiteral);
      this.append2TokenText(ch);
    }

    return newState;
  },
};

exports.prototypeMixin = function (SimpleLexer) {
  Object.keys(prototypeMap).forEach((key) => {
    SimpleLexer.prototype[key] = prototypeMap[key];
  });
};

exports.initMixin = function (SimpleLexer) {
  SimpleLexer.prototype._init = function (sourceCode) {
    const vm = this;

    vm.$sourceCode = sourceCode;

    vm._tokenList = [];
    vm._token = new SimpleToken();
    vm._tokenVal = "";

    vm.tokenize(sourceCode);
  };
};
