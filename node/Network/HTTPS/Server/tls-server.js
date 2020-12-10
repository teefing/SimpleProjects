const tls = require("tls");
const fs = require("fs");

const options = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.crt"),
  requestCert: true,
  ca: [fs.readFileSync("../CA/ca.crt")],
};

const server = tls.createServer(options, function(stream) {
  console.log(
    "server connected",
    stream.authorized ? "authorized" : "unauthorized"
  );
  stream.on("end", function() {
    console.log("server close");
    server.close();
  });
  stream.write("welcome\n");
  stream.setEncoding("utf8");
  stream.pipe(stream);
});

server.listen(8000, function() {
  console.log("server found");
});
