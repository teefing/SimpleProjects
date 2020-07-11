/** 一个简易的静态资源服务器 */

const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  const fileUrl = url.parse(req.url);
  const filePath = path.join(__dirname, fileUrl.pathname);
  fs.stat(filePath, function (err, stat) {
    if (err) {
      if ("ENOENT" === err.code) {
        res.statusCode = 404;
        res.end("Not Found");
      } else {
        res.statusCode = 500;
        res.end("Internet Server Error");
      }
    } else {
      res.setHeader("Content-Length", stat.size);
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      stream.on("error", function () {
        res.statusCode = 500;
        res.end("Internal Server Error");
      });
    }
  });
});

server.listen(3000);
