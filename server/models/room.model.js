const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId},
  name: String,
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: "Message"}]
});

const Room = mongoose.model('Room', roomSchema, 'rooms');

module.exports = Room;
