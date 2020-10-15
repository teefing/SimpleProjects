import { parsePath, readOnly } from "./utils";


let location = getLocation();
function getLocation() {
  const { pathname, search, hash } = window.location;
  return readOnly({
    pathname: pathname.slice(1),
    search,
    hash,
    state: null,
  });
}
function getNextLocation(to, state) {
  return readOnly({
    ...parsePath(to),
    state,
  });
}


let listeners = []
function listen (cb) {
  listeners.push(cb)
  return function () {
    listeners = listeners.filter(listener => listener === cb)
  }
}
/*
外部通过这样调用
history.listen(location => {
  console.log('change', location);
})
*/


function push (to, state) {
  location = getNextLocation(to, state)
  window.history.pushState(state, '', to)
  listeners.forEach(fn => fn(location))
}

window.addEventListener('popstate', () => {
  location = getLocation()
  listeners.forEach(fn => fn(location))
})

export const history = {
  get location() {
    return location;
  },
  push,
  listen,
};