//third party modules:
const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");
  //in ws, we use the send method. In Socketio, we use emit
  socket.emit("messageFromServer", { data: "Welcome to the show" });
  socket.on("messageFromClient", (data) => {
    console.log(data);
  });
});
