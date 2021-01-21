const el = function(tagName = "", props = {}, children = []) {
  return {
    render() {
      let dom = document.createElement(tagName);
      Object.entries(props).map(([key, value]) => {
        dom.setAttribute(key, value);
      });
      if (Array.isArray(children)) {
        children.forEach((child) => {
          if (child.render) {
            dom.appendChild(child.render());
          } else if (typeof child === "string") {
            dom.appendChild(document.createTextNode("child"));
          }
        });
      }
      return dom;
    },
  };
};
const ul = el("ul", { id: "list" }, [
  el("li", { class: "item" }, ["Item 1"]),
  el("li", { class: "item" }, ["Item 2"]),
  el("li", { class: "item" }, ["Item 3"]),
]);
const ulRoot = ul.render();
document.body.appendChild(ulRoot);

/**
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
 */
