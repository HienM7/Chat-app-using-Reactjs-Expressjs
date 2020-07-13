const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  room: {type: mongoose.Schema.Types.ObjectId, ref: "Room"},
  content: {type: String}

});

const Message = mongoose.model('Message', messageSchema, 'messages');

module.exports = Message;
