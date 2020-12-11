const http = require("http");
const fs = require("fs");
const mime = require("mime");
const path = require("path");
const url = require("url");

http
  .createServer((req, res) => {
    const sendFile = function(res, filePath) {
      fs.stat(filePath, function(err, stat) {
        const stream = fs.createReadStream(filePath);
        res.setHeader("content-type", mime.getType(filePath));
        res.setHeader("content-length", stat.size);
        res.setHeader(
          "content-disposition",
          `attachment;filename="${path.basename(filePath)}"`
        );
        res.writeHead(200);
        stream.pipe(res);
      });
    };

    const pathname = url.parse(req.url).pathname;
    sendFile(res, path.join(__dirname, pathname));
  })
  .listen(3000);
