const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User "${socket.id}" connected`);

  socket.on("chat_init", (data) => {
    socket.join(data.room);

    const userData = {
      userId: socket.id,
      username: data.username,
    };

    socket.to(data.room).emit("emit_user", userData);

    console.log(
      `User "${data.username}" with id "${socket.id}" has joined the room "${
        data.room
      }" that has "${io.sockets.adapter.rooms.get(data.room).size}" users`
    );
  });

  socket.on("send_message", (data) => {
    const messageUserCountPair = {
      messageWithSender: data.messageWithSender,
      userAmount: io.sockets.adapter.rooms.get(data.room).size,
    };

    socket.to(data.room).emit("receive_message", messageUserCountPair);

    console.log(
      `User "${data.messageWithSender.sender}" send a message : "${data.messageWithSender.message}" to the room "${data.room}"`
    );
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});
