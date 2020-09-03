const apply = (action, ...args) => {
  // babel-env
  require(`./${action}`).default(...args);
};

export default apply;
