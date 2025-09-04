const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

const messages = []; // Store chat messages here

io.on("connection", (socket) => {
  console.log("a user connected");

  // Send chat history to the newly connected user
  socket.emit("chat history", messages);

  socket.on("chat message", (msg) => {
    messages.push(msg);       // Save message
    io.emit("chat message", msg); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
