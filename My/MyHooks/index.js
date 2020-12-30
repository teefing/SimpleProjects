let isMount = true;
let workInProgressHook = null; // 当前正在处理的hook

const fiber = {
  stateNode: App,
  memorizedState: null, // 保存链表
};

/**
 * 一次App函数的执行
 */
function schedule() {
  // 复位
  workInProgressHook = fiber.memorizedState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
}

function useState(initialState) {
  let hook;
  // 首次渲染
  if (isMount) {
    hook = {
      // hook存储的数据
      memorizedState: initialState,
      // 下一个hook
      next: null,
      // ？？
      queue: {
        pending: null,
      },
    };
    // 当fiber的链表为空
    if (!fiber.memorizedState) {
      // 给fiber的链表赋值第一个节点
      fiber.memorizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }

    workInProgressHook = hook;
  } else {
    // 非首次渲染
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  let baseState = hook.memorizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;
    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next);

    hook.queue.pending = null;
  }

  hook.memorizedState = baseState;
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
  debugger;
  const update = {
    action,
    next: null,
  };

  // 当前hook还没有需要触发的更新
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;
  schedule();
}

function App() {
  const [num, setNum] = useState(0);
  const [num1, setNum1] = useState(0);

  console.log("isMount", isMount);
  console.log("num: ", num);
  return {
    onClick() {
      setNum((num) => num + 1);
      setNum((num) => num + 1);
    },
  };
}

window.app = schedule();
