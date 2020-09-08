const { EmDfaState, EmTokenType } = require("../../helpers/enum");
const { isDigit, isIdentifier } = require("../../helpers/utils");
const { SimpleToken } = require("./simpleToken");

const prototypeMap = {
  /**
   * 对源代码进行分词生成token列表
   * @param {string} sourceCode - 要解析的源代码
   */
  _tokenize(sourceCode) {
    for (let char of sourceCode) {
      switch (this._state) {
        case EmDfaState.Initial:
          this._initToken(char);
          break;
        case EmDfaState.Identifier:
          if (isIdentifier(char)) {
            this._token.value += char;
          } else {
            this._initToken(char);
          }
          break;
        case EmDfaState.Number:
          if (isDigit(char)) {
            this._token.value += char;
          } else {
            this._initToken(char);
          }
          break;
        case EmDfaState.GT:
          if (char === "=") {
            this._token.value += char;
            this._token.type = EmTokenType.GE;
            this._state = EmDfaState.GE;
          } else {
            this._initToken(char);
          }
          break;
        default:
          this._initToken(char);
      }
    }
  },

  _saveToken() {
    if (this._state !== EmDfaState.Initial) {
      this._tokenList.push(this._token);
    }
  },

  _initToken(char) {
    this._saveToken();

    this._state = EmDfaState.Initial;
    this._token = new SimpleToken({ value: char });

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
      // TODO: 未识别字符处理
      // console.error(`不合法的 token: '${char}'`);
    }
  },

  getTokenList() {
    return this._tokenList;
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

    const tempSourceCode = sourceCode + " ";
    vm._tokenize(tempSourceCode);
  };
};
