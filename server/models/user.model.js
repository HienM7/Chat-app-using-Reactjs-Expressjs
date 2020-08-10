const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId},
  name: String,
  email: String,
  password: String,
  isAdmin: {type: Boolean, default: false},
  path: String,
  avatarUrl: String,
  isConfirmation: {type: Boolean, default: false}
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
