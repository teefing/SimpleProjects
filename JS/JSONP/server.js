const http = require('http');
const url = require('url');
const qs = require('querystring');

const handleQuery = (query) => {
  const res = query;
  res.fromServer = true;
  delete res.callback;
  return res;
};

http.createServer((req, res) => {
  const params = url.parse(req.url);
  const query = qs.parse(params.query);
  if (params.query && query.callback) {
    const str = `${query.callback}(${JSON.stringify(handleQuery(query))})`;
    res.end(str);
  }
}).listen(3001);
