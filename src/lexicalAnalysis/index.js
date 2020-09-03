/** 词法分析 */
// 词法分析就是对源代码进行分词，把源代码分成一个个的词法单元（Token）。整个过程就是一个有限状态自动机迁移的一个过程
// 1、枚举token类型
// 2、枚举有限状态机类型
// 3、遍历source code

// 目标
// 1、加减乘除运算；
// 2、大小比较；

const { prototypeMixin } = require("./instance/prototype");

function SimpleLexer(sourceCode) {
  if (!this instanceof SimpleLexer) {
    throw new Error("error");
  }

  this._init(sourceCode);
}

prototypeMixin(SimpleLexer);

module.exports = SimpleLexer;
