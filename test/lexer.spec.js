const SimpleLexer = require("../src/lexicalAnalysis");

test("词法解析器: token列表长度验证", () => {
  const lexerInstance = new SimpleLexer("1 + 23 >= 9");

  expect(lexerInstance.getTokenList()).toHaveLength(5);
});

test("词法解析器: 结果验证", () => {
  const lexerInstance = new SimpleLexer("1 +");

  const tokenList = [
    { type: "Number", value: "1" },
    { type: "Plus", value: "+" },
  ];

  expect(JSON.stringify(lexerInstance.getTokenList())).toBe(
    JSON.stringify(tokenList)
  );
});
