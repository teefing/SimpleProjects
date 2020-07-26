const util = require('util')
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const core = require("@babel/core")

let catchNode = parser.parse('console.log(e)').program.body

module.exports = function (source) {
  let ast = parser.parse(source);

  traverse(ast, {
    AwaitExpression(path) {
      if (path.findParent((path) => t.isTryStatement(path.node))) return;
      if (t.isVariableDeclarator(path.parent)) {
        // 当情况为声明变量时 类似 let res = await asyncFunc()
        let variableDeclarationPath = path.parentPath.parentPath;
        // console.log('variableDeclarationPath: ', variableDeclarationPath);
        let tryCatchAst = t.tryStatement(
          t.blockStatement([variableDeclarationPath.node]),
          t.catchClause(t.identifier('e'), t.blockStatement(catchNode))
        );
        variableDeclarationPath.replaceWithMultiple([tryCatchAst]);
      } else if (t.isAssignmentExpression(path.parent)) {
        // 当情况为赋值表达式时 类似 res = await asyncFunc()
        let expressionStatementPath = path.parentPath.parentPath
        let tryCatchAst = t.tryStatement(
          t.blockStatement([expressionStatementPath.node]),
          t.catchClause(t.identifier('e'), t.blockStatement(catchNode))
        )
        expressionStatementPath.replaceWithMultiple([tryCatchAst])
      } else {
        // 当情况为await表达式时 类似 await asyncFunc()
        let tryCatchAst = t.tryStatement(
          t.blockStatement([
            t.expressionStatement(path.node)
          ]),
          t.catchClause(t.identifier('e'), t.blockStatement(catchNode))
        )
        path.replaceWithMultiple([tryCatchAst])
      }
      
    },
  });

  return core.transformFromAstSync(ast).code;
};
