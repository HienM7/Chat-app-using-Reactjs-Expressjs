const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;
const sendEmail = require('./sendEmail');
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const isUserExist = await User.findOne({email: email});
    if (isUserExist) {
      res.json({
        success: false,
        msg: "Email is exist"
      });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      _id: new ObjectId(),
      name: name,
      email: email,
      password: hashPassword,
      isConfirmation: false
    };
    

    await User.create(newUser);
    jwt.sign({userId: newUser._id }, process.env.SECRET_KEY, (err, token) => {
      if (!err) {
        res.json({
          userId: newUser._id,
          username: newUser.name,
          avatarUrl: newUser.avatarUrl,
          isConfirmation: newUser.isConfirmation,
          success: true,
          token: token
        })
        return;
      }
      console.log(err);
    });

    sendEmail(newUser);

  } catch (e) {
    console.log(e);
  }

}

module.exports.confirmation = async (req, res) => {
  const { emailToken } = req.params;

  try {
    const tokenVerify = jwt.verify(emailToken, process.env.SECRET_KEY);
    const { email } = tokenVerify;
    console.log(email);
    const user = await User.find({email});
    if (!user) {
      res.send("<h1>NOT FOUND</h1>");
      return;
    }
    await User.updateOne({email}, {
      isConfirmation: true
    });
    res.send("<h1>Confirm Success</h1>");
  } catch (e) {
    console.log(e);
  }

}

