const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const core = require("@babel/core");

function transformJsx2CreateElement(source) {
  let ast = parser.parse(source, {
    plugins: ["jsx"],
  });
  traverse(ast, {
    JSXElement(path) {
      const openingElement = path.node.openingElement;
      const tagName = openingElement.name.name; // Nav
      const args = [];
      args.push(t.stringLiteral(tagName)); // { type: 'StringLiteral', value: 'Nav' }
      let attribs = t.objectExpression(
        openingElement.attributes.map((node) => {
          const key = node.name.name;
          const value = node.value.value;
          return t.objectProperty(t.identifier(key), t.stringLiteral(value));
        })
      );

      if (attribs.properties.length) {
        args.push(attribs);
      } else {
        args.push(t.nullLiteral()); // { type: 'NullLiteral' }
      }

      const reactIdentifier = t.identifier("React"); // { type: 'Identifier', name: 'React' }
      const createElementIdentifier = t.identifier("createElement");
      const callee = t.memberExpression(
        reactIdentifier,
        createElementIdentifier
      ); // React.createElement对应的AST
      const callExpression = t.callExpression(callee, args);
      callExpression.arguments = callExpression.arguments.concat(
        path.node.children
      );
      path.replaceWith(callExpression, path.node);
    },
  });

  const result = core.transformFromAstSync(ast).code;
  // console.log(result);
  return result;
}

transformJsx2CreateElement(`<Nav class="test"><div>111</div></Nav>`);
