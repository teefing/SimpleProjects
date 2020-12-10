/**
 * @description 获取 url 参数
 * @param {String} query url query 参数字符串
 * @return {Object} 参数对象
 *
 * @example
 * getUrlQuery("test.com?a=1&b=2") => {a: 1, b: 2}
 */
console.log(getUrlQuery("test.com?a=1&b=2"));
function getUrlQuery(query) {
  var pattern = /(\w+)=(\w+)/gi; // 定义正则表达式
  var params = {}; // 定义数组
  query.replace(pattern, function(match, key, value) {
    params[key] = value;
  });
  return params;
}
// export default getUrlQuery;
