const apply = (action, ...args) => {
  require(`./${action}`).default(...args);
};

export default apply