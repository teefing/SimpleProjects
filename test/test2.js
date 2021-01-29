import React from "react";

const EMPTY = Symbol();

export function createContainer(useHook) {
  const Context = React.createContext(EMPTY);
  function Provider(props) {
    let value = useHook(props.initialState);
    return <Context.Provider value={value}></Context.Provider>;
  }

  function useContainer() {
    let value = React.useContext(Context);
    return value;
  }

  return { Provider, useContainer };
}
