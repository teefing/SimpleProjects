// Hello <%= username%>转换为"Hello " + obj.username
const render = function(str, data) {
  let tpl = str.replace(/<%=([\s\S]+?)%>/g, function(match, code) {
    return ` + obj.`;
  });
};
