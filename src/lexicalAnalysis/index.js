/** 词法分析 */
// 词法分析就是对源代码进行分词，把源代码分成一个个的词法单元（Token）。整个过程就是一个有限状态自动机迁移的一个过程
// 1、枚举token类型
// 2、枚举有限状态机类型
// 3、遍历source code

// 目标
// 1、加减乘除运算；
// 2、大小比较；

const { EmDfaState } = require("./enum/dfaState");
const { EmTokenType } = require("./enum/tokenType");

function SimpleLexer(sourceCode) {
  this.$source = sourceCode;

  this.tokenList = [];
  this.token = { type: "", value: "" };
  this.tokenValue = "";
}

SimpleLexer.prototype.initToken = function (char) {};

SimpleLexer.prototype.tokenize = function (sourceCode) {
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
};

module.exports = SimpleLexer;
