const http = require('http');

const server = http.createServer((request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    response.setHeader('access-control-allow-origin', '*');
    response.setHeader('access-control-allow-headers', 'X-Requested-With,Content-Type');
    // response.setHeader('Access-Control-Allow-Methods', ['GET']);
    // response.setHeader('Access-Control-Allow-Credentials', true);
    // response.setHeader('Content-Type', 'application/json; charset=utf-8');

    response.end(data);
  });
  console.log(data);
});
server.listen(3000);
