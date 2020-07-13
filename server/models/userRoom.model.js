const mongoose = require('mongoose');

const userRoomSchema = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  room: {type: mongoose.Schema.Types.ObjectId, ref: "Room"},
});

const UserRoom = mongoose.model('UserRoom', userRoomSchema, 'user-room');

module.exports = UserRoom;
