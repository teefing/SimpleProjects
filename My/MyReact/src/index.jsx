
/**
 * const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
 */
// 创建文本节点的virtual dom
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
// 创建非文本节点的virtual dom
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

const isEvent = (key) => key.startsWith('on');
const isProperty = (key) => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);
function updateDom(dom, prevProps, nextProps) {
  // 移除旧的或者已经被改变的事件监听器
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // 移除旧的并且不再需要的属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = '';
    });

  // 添加新的事件监听器
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });


  // 设置新的或者被改变的属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });
}

// 创建真实dom节点
function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}

let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;
let deletions = null;


function commitWork(fiber) {
  if (!fiber) return;
  const domParent = fiber.parent.dom;
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitRoot() {
  // 先清理节点
  deletions.forEach(commitWork);
  // add nodes to dom
  commitWork(wipRoot.child);
  // 在commit fiber后要保留该fiber用于为下一次diff提供数据
  currentRoot = wipRoot;
  wipRoot = null;
}

// render其实只做了一些数据初始化的操作，react一直都有一个线程在跑，如果有数据就会处理
// 可以把react背后的线程比作流水线，当render放了数据后，经过流水线的操作就会产出对应的结果
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot, // 旧fiber的链接
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

// 创建新的fiber, 将virtual dom树改造为fiber树（有点类似树转换为链表结构）
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;
  while (index < elements.length || oldFiber) {
    const element = elements[index];
    let newFiber = null;
    // compare oldFiber to element
    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      //  update the node
      // 如果类型相同，保留dom节点，使用新的props来更新
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
      };
    }

    if (!sameType && element) {
      // add the new node
      // 类型不同，如果有新元素，则要创建新的节点
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }

    if (!sameType && oldFiber) {
      // remove the old node
      // 类型不同，如果有旧的节点，要删除旧节点
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index += 1;
  }
}

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function shouldYield (deadline) {
  // 根据requestIdleCallback返回的deadline参数来判断是否还有剩余时间，从而决定是否中断
  return deadline.timeRemaining() < 1
}

function workLoop(deadline) {
  while (nextUnitOfWork && !shouldYield(deadline)) { // 如果有下一个任务单元并且不应该被中断
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 执行下一个任务单元并且得到新的任务单元
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);


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
// const element = Teact.createElement(
//   'div',
//   { id: 'foo' },
//   Teact.createElement('a', null, 'bar'),
//   Teact.createElement('b'),
// );

/** @jsx Teact.createElement */ // 这样注释后，当babel转译jsx时，它将使用我们定义的功能
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )

/** @jsx Teact.createElement */ // 这样注释后，当babel转译jsx时，它将使用我们定义的功能
const container = document.getElementById('root');

const reRender = (value) => {
  const updateValue = (e) => {
    reRender(e.target.value);
  };

  const element = (
    <div>
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
      {value && <div>something</div>}
    </div>
  );
  Teact.render(element, container);
};


reRender('World');
