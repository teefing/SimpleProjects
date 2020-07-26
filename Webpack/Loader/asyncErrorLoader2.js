const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const core = require("@babel/core")

const isAsyncFuncNode = node =>
  t.isFunctionDeclaration(node, {
    async: true
  }) ||
  t.isArrowFunctionExpression(node, {
    async: true
  }) ||
  t.isFunctionExpression(node, {
    async: true
  }) ||
  t.isObjectMethod(node, {
    async: true
  });

let catchNode = parser.parse('console.log(e)').program.body

module.exports = function (source) {
  let ast = parser.parse(source);

  traverse(ast, {
    AwaitExpression(path) {
      // 递归向上找异步函数的 node 节点
      while (path && path.node) {
        let parentPath = path.parentPath;
        if (
          // 找到 async Function
          t.isBlockStatement(path.node) &&
          isAsyncFuncNode(parentPath.node)
        ) {
          let tryCatchAst = t.tryStatement(
            path.node,
            t.catchClause(
              t.identifier('e'),
              t.blockStatement(catchNode)
            )
          );
          path.replaceWithMultiple([tryCatchAst]);
          return;
        } else if (
          // 已经包含 try 语句则直接退出
          t.isBlockStatement(path.node) &&
          t.isTryStatement(parentPath.node)
        ) {
          return;
        }
        path = parentPath;
      }
    }
  });

  return core.transformFromAstSync(ast).code;
};
