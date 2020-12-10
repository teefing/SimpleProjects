const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

http
  .createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log("request: ", path.join(__dirname, pathname));
    fs.readFile(path.join(__dirname, pathname), function(err, file) {
      if (err) {
        res.writeHead(404);
        res.end("找不到文件");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(file);
    });
  })
  .listen(3000);
