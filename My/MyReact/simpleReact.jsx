
/**
 * const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
 */
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof child === 'object'
        ? child
        : createTextElement(child))),
    },
  };
}

function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);

  element.props.children.forEach((child) => render(child, dom));
  const isProperty = (key) => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  container.appendChild(dom);
}


const Teact = {
  createElement,
  render,
};

// const element = React.createElement(
//   'div',
//   { id: 'foo' },
//   React.createElement('a', null, 'bar'),
//   React.createElement('b'),
// );
const element = Teact.createElement(
  'div',
  { id: 'foo' },
  Teact.createElement('a', null, 'bar'),
  Teact.createElement('b'),
);

/** @jsx Teact.createElement */ // 这样注释后，当babel转译jsx时，它将使用我们定义的功能
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )

const container = document.getElementById('root');

render(element, container);
