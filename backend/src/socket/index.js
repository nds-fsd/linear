const { jwtVerifier } = require("../security/jwt");
const socketio = require("socket.io");


const configurePrivateSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: "*",
    },
    path: "/private",
  });

  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      jwtVerifier(socket.handshake.auth.token, (err, user) => {
        if (err) return next(new Error("Authentication error"));
        socket.user = user;
        console.log(`User: ${user.name}`);
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    socket.emit("connection", "You are now connected");
    socket.join(`user-${socket.user.id}`);

    console.log(
      `User: ${socket.user.name} has now its session with id ${socket.user.id}`
    );

  });

  return io;
};

module.exports = {  configurePrivateSocket };