
  (function(modules){
    function require(id){
      const module = {exports: {}}
      modules[id](module, module.exports, require)
      return module.exports
    }
    require('/Users/tengfei/code/learn/simple_projects/My/MyWebpack/src/index.js')
  })({'/Users/tengfei/code/learn/simple_projects/My/MyWebpack/src/index.js': (
      function(module, exports, require){"use strict";

var _utils = require("./utils.js");

require("./style.css");

document.body.innerHTML = (0, _utils.add)(1, 2);}
    ),'./utils.js': (
      function(module, exports, require){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = void 0;

var add = function add(a, b) {
  return a + b;
};

exports.add = add;}
    ),'./style.css': (
      function(module, exports, require){
        const style = document.createElement('style')
        style.innerText = "body {\n  background-color: goldenrod;\n}"
        document.head.appendChild(style)
        }
    ),})
  