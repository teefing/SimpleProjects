const util = require("util");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const core = require("@babel/core");
const loaderUtils = require("loader-utils");
const validateOptions = require("schema-utils");

const catchNode = parser.parse("console.log(e)").program.body;

const schema = {
  type: "object",
  properties: {
    debug: {
      type: "boolean",
    },
  },
  additionalProperties: false,
};

module.exports = function (content, map, meta) {
  console.log("asyncErrorLoader");
  const options = loaderUtils.getOptions(this) || {};
  if (options.debug) {
    console.log("content: \n", content);
    console.log("map: \n", map);
    console.log("meta: \n", meta);
  }

  validateOptions(schema, options, "Async Error Loader");

  this.cacheable();

  const source = content;
  const ast = parser.parse(source, { sourceType: "module" });

  traverse(ast, {
    AwaitExpression(path) {
      if (path.findParent((path) => t.isTryStatement(path.node))) return;
      if (t.isVariableDeclarator(path.parent)) {
        // 当情况为声明变量时 类似 let res = await asyncFunc()
        const variableDeclarationPath = path.parentPath.parentPath;
        // console.log('variableDeclarationPath: ', variableDeclarationPath);
        const tryCatchAst = t.tryStatement(
          t.blockStatement([variableDeclarationPath.node]),
          t.catchClause(t.identifier("e"), t.blockStatement(catchNode))
        );
        variableDeclarationPath.replaceWithMultiple([tryCatchAst]);
      } else if (t.isAssignmentExpression(path.parent)) {
        // 当情况为赋值表达式时 类似 res = await asyncFunc()
        const expressionStatementPath = path.parentPath.parentPath;
        const tryCatchAst = t.tryStatement(
          t.blockStatement([expressionStatementPath.node]),
          t.catchClause(t.identifier("e"), t.blockStatement(catchNode))
        );
        expressionStatementPath.replaceWithMultiple([tryCatchAst]);
      } else {
        // 当情况为await表达式时 类似 await asyncFunc()
        const tryCatchAst = t.tryStatement(
          t.blockStatement([t.expressionStatement(path.node)]),
          t.catchClause(t.identifier("e"), t.blockStatement(catchNode))
        );
        path.replaceWithMultiple([tryCatchAst]);
      }
    },
  });

  return core.transformFromAstSync(ast).code;
};
