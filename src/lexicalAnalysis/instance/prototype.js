const { EmDfaState, EmTokenType } = require("../../helpers/enum");
const { isDigit, isIdentifier } = require("../../helpers/utils");
const { SimpleToken } = require("./simpleToken");

const prototypeMap = {
  /**
   * 对源代码进行分词生成token列表
   * @param {string} sourceCode - 要解析的源代码
   */
  tokenize(sourceCode) {
    for (let char of sourceCode) {
      switch (this._state) {
        case EmDfaState.Initial:
          this.initToken(char);
          break;
        case EmDfaState.Identifier:
          if (isIdentifier(char) || isDigit(char)) {
            this._token.value += char;
          } else {
            this.initToken(char);
          }
          break;
        case EmDfaState.Number:
          if (isDigit(char)) {
            this._token.value += char;
          } else {
            this.initToken(char);
          }
          break;
        case EmDfaState.GT:
          if (char === "=") {
            this._token.value += char;
            this._token.value = EmTokenType.GE;
            state = EmDfaState.GE;
          } else {
            this.initToken(char);
          }
          break;
        // 其余没有匹配自动机的字符，直接开始下一个初始化字符
        default:
          this.initToken(char);
      }
    }
  },

  initToken(char) {
    if (this._state !== EmDfaState.Initial) {
      this._tokenList.push(this._token);
    }

    if (char === " ") {
      this._state = EmDfaState.Initial;
      this._token = new SimpleToken();
      return;
    }

    this._token.value = char;

    if (isIdentifier(char)) {
      this._state = EmDfaState.Identifier;
      this._token.type = EmTokenType.Identifier;
    } else if (isDigit(char)) {
      this._state = EmDfaState.Number;
      this._token.type = EmTokenType.Number;
    } else if (char === ">") {
      this._state = EmDfaState.GT;
      this._token.type = EmTokenType.GT;
    } else if (char === "=") {
      this._state = EmDfaState.EQ;
      this._token.type = EmTokenType.EQ;
    } else if (char === "+") {
      this._state = EmDfaState.Plus;
      this._token.type = EmTokenType.Plus;
    } else if (char === "-") {
      this._state = EmDfaState.Minus;
      this._token.type = EmTokenType.Minus;
    } else if (char === "*") {
      this._state = EmDfaState.Multiply;
      this._token.type = EmTokenType.Multiply;
    } else if (char === "/") {
      this._state = EmDfaState.Divide;
      this._token.type = EmTokenType.Divide;
    } else {
      throw new Error(`不合法的 token: '${char}'`);
    }
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

    vm._tokenList = [];
    vm._token = new SimpleToken();
    vm._state = EmDfaState.Initial;

    vm.tokenize(sourceCode);
  };
};
