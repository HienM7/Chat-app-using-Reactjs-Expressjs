const UserRoom = require('../models/userRoom.model');
const User = require('../models/user.model');
const Room = require('../models/room.model');
const Message = require('../models/message.model');
const jwt = require('jsonwebtoken');

module.exports.getAllMessage = async (req, res) => {
  try {
    const token = req.header('x-access-token');
    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
    const { userId } = tokenVerify;
    const user = await User.findOne({_id: userId});
    if(!user) {
      res.json({ 
        success: false    
    });
      return;
    }
    console.log(userId)
    const dataRoomOfUser = await UserRoom.find({user: userId})
      .populate({
        path: "room",
        select: "name messages _id",
        populate: {
          path: "messages",
          select: "_id user content",
          populate: {
            path: "user",
            select: "_id name avatarUrl"
          }
        }
      })
      .exec();
    const allMessageOfRoomOfUser = {};
    dataRoomOfUser.forEach(item => {
      allMessageOfRoomOfUser[item.room._id] = item.room;
    })
    res.json({
      allMessage: allMessageOfRoomOfUser,
      success: true
    });
  } catch(e) {
    res.json({ 
      success: false,
      msg: e
    });
    console.log(e);
  }

}