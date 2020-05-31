interface ComposeInterface {
  (...funcs: Function[]): Function;
}

const compose: ComposeInterface = (...funcs) => {
  if (!funcs) return args => args;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce((fn1, fn2) => (...args) => fn1(fn2(...args)));
};

interface CreateStoreInterface {
  (reducers: any, initialStore: any, enhancer: any): object;
}

const createStore: CreateStoreInterface = (reducer, initState, enhancer) => {
  // 兼容传入了enhancer但没传入initialStore的情况
  if (!enhancer && typeof initState === "function") {
    enhancer = initState;
    initState = null;
  }

  if (enhancer && typeof enhancer === "function") {
    return enhancer(createStore)(reducer, initState);
  }
  let store = initState;
  const getState = () => store;

  // 订阅
  let listeners = [];
  const subscribe = listener => {
    if (typeof listener === "function") {
      listeners.push(listener);
    }
    return () => unsubscribe(listener)
  };

  // 取消订阅
  const unsubscribe = listener => {
    const index = listener.indexOf(listener);
    listener.splice(index, 1);
  };

  // 发布，如果多个action同时发送，store的最后结果就不确定了，需要加锁
  let isDispatch = false;
  const dispatch = action => {
    if (isDispatch) return action;
    isDispatch = true;
    store = reducer(store, action);
    isDispatch = false;
    listeners.forEach(listener => listener());
    return action;
  };

  return {
    getState,
    subscribe,
    unsubscribe,
    dispatch
  };
};

// combineReducers 用于将多个reducer组合在一起变成一个新的reducer，对外表现形式得和普通的reducer一样
/**
 *
 * @param reducers 一个包含多个reducer的对象
 */
const combineReducers = reducers => {
  // 收集所有传入的reducer
  const finalReducers = {};
  Object.keys(reducers).forEach(reducerKey => {
    if (typeof finalReducers[reducerKey] === "function") {
      finalReducers[reducerKey] = reducers[reducerKey];
    }
  });

  // 在dispatch中执行combination函数时，遍历调用所有的reducer，
  // 如果其中有reducer返回的子state发生了变化，那么combination就返回变化后的父state（store），
  // 反之，如果遍历完所有的reducer后，所有state都没发生变化，那么就返回原来的state
  return function combination(state = {}, action) {
    let hasChanged = false;
    const store = {};
    Object.keys(finalReducers).forEach(key => {
      const reducer = finalReducers[key];
      const nextState = reducer(state[key], action);
      store[key] = nextState;
      hasChanged = hasChanged || nextState !== state[key];
    });
    return hasChanged ? store : state;
  };
};

const applyMiddleWare = (...middlewares) => {
  return (createStore) => (reducer, initState, enhancer) => {
    const store = createStore(reducer, initState, enhancer)
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => store.dispatch(action)
    }
    let chain = middlewares.map(middleware => middleware(middlewareAPI))
    store.dispatch = compose(...chain)(store.dispatch)
    return {
      ...store
    }
  }
};

const bindActionCreators = (action, dispatch) => {
  return (...args) => dispatch(action(...args))
};
