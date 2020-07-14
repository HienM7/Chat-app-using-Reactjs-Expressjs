const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


module.exports.doLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email: email});
    if(!user) {
      res.json({msg: "Email does not exist"});
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      res.json({error: "Password is incorrect"})
      return;
    }
    jwt.sign({userId: user._id }, process.env.SECRET_KEY, (err, token) => {
      if (!err) {
        res.json({
          userId: user._id,
          username: user.name,
          avatarUrl: user.avatarUrl,
          success: true,
          token: token
        })
        return;
      }
      console.log(err);
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports.checkLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
    const { userId } = tokenVerify;
    console.log(userId);
    const user = await User.findOne({_id: userId});
    if (!user) {
      res.json({ 
        success: false    
    });
      return;
    }
    res.json({ 
      success: true,
      userId: user._id,
      username: user.name,
      avatarUrl: user.avatarUrl
    })
  } catch(e) {
    res.json({ 
      success: false
    });
  }
}