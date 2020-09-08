/** 词法分析 */
// 词法分析就是对源代码进行分词，把源代码分成一个个的词法单元（Token）。整个过程就是一个有限状态自动机迁移的一个过程
// 1、枚举token类型
// 2、枚举有限状态机类型
// 3、遍历source code

/** 要实现的功能 */
// [✔️] 1、加减乘除运算；
// [✔️] 2、大小比较；
// [×] 3、变量声明；
// [×] 4、特殊字符处理；

const { prototypeMixin, initMixin } = require("./instance");

function SimpleLexer(sourceCode) {
  if (!this instanceof SimpleLexer) {
    console.error("SimpleLexer 不能作为方法直接调用，请使用 new 关键字");
  }

  this._init(sourceCode);
}

initMixin(SimpleLexer);
prototypeMixin(SimpleLexer);

module.exports = SimpleLexer;
