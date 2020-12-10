let net = require("net");
const server = net.createServer();
server.on("connection", function(socket) {
  // 以下都是连接后的socket事件
  socket.on("data", function() {
    socket.write("hello");
  });
  socket.on("end", function() {
    console.log("close connection");
  });
  socket.write("welcome to node");
});
server.listen(8124, function() {
  console.log("server found");
});
/* 同上
server.on("listening", function() {
  console.log("server found");
});
*/
