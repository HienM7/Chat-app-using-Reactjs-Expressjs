module.exports = (io) =>  {
  io.on("connection", (socket) => {
    console.log(socket.id + "is connected")
    socket.on("chat message", (payload) => {
      io.emit("chat message", payload);
    })
    socket.on("disconnect", () => {
      console.log(socket.id + ' is disconnected')
    })
  })
}