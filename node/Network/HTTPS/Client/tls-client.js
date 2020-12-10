const tls = require("tls");
const fs = require("fs");

const options = {
  key: fs.readFileSync("./client.key"),
  cert: fs.readFileSync("./client.crt"),
  requestCert: true,
  ca: [fs.readFileSync("../CA/ca.crt")],
};

const stream = tls.connect(8000, options, function() {
  console.log(
    "client connected",
    stream.authorized ? "authorized" : "unauthorized"
  );
  process.stdin.pipe(stream);
});

stream.setEncoding("utf8");
stream.on("data", function(data) {
  console.log(data);
});
