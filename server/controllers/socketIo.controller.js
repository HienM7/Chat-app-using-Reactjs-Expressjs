const Message = require('../models/message.model');
const Room = require('../models/room.model');
const User = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

module.exports = (io) =>  {
  io.on("connection", (socket) => {
    console.log(socket.id + "is connected")
    socket.on("chat message", (payload) => {
      const {token, msg, roomId} = payload;

      const saveMessage = async () => {
        try {
          const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
          const { userId } = tokenVerify;
          const user = await User.findOne({_id: userId});
          if (!user) {
            return;
          }
          const checkRoom = await Room.findOne({_id: roomId});
          if (!checkRoom) {
            return;
          }
          const messageId = new ObjectId();
          await Message.create({
            _id: messageId,
            user: user._id,
            room: roomId,
            content: msg
          })
          await Room.updateOne({_id: roomId}, {$push: {messages: messageId}});
          payload.fromUser = {
            _id: user._id,
            name: user.name,
            avatarUrl: user.avatarUrl
          }
          io.emit("chat message", payload);
        } catch (e) {
          console.log(e);
        }
       
      }
      saveMessage();
    })
    socket.on("disconnect", () => {
      console.log(socket.id + ' is disconnected')
    })
  })
}