/**
 *
 * @param {string} url
 * @param {string} key
 */
function getUrlQuery(url, key) {
  let pattern = /(\w+)=(\w+)/gi;
  let params = {};
  url.replace(pattern, function(substring, p1, p2) {
    params[p1] = p2;
  });
  if (key) return params[key];
  return params;
}