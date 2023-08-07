const { Server } = require("socket.io");

module.exports = function createSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true // If you need to send cookies with the request
    }
  });
  return io;
};
