const express = require("express");
const app = express();
const socketio = require("socket.io");
const PORT = process.env.PORT || 8000;
app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(PORT);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");
  //in ws, we use the send method. In Socketio, we use emit
  //   socket.emit("messageFromServer", { data: "Welcome to the show" });
  socket.on("newMessageToServer", (dataFromClient) => {
    // console.log(dataFromClient);
    io.emit("newMessageToClients", { text: dataFromClient.text });
  });
});
