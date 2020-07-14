const UserRoom = require('../models/userRoom.model');
const User = require('../models/user.model');
const Room = require('../models/room.model');
const Message = require('../models/message.model');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require("jsonwebtoken");

module.exports.createRoom = async (req, res) => {
  try {
    const { roomName } = req.body;
    if (!roomName.trim()) return;
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
    const newRoom = {
      _id: ObjectId(),
      name: roomName,
      messages: []
    }

    await Room.create(newRoom);
    await UserRoom.create({
      _id: ObjectId(),
      user: userId,
      room: newRoom._id
    });
    res.json({
      [newRoom._id]: newRoom,
      success: true
    });

  } catch (e) {
    console.log(e);
    res.json({
      success: false
    })
  }


}



module.exports.joinRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const token = req.header('x-access-token');
    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
    const { userId } = tokenVerify;
    const user = await User.findOne({_id: userId});
    const room = await Room.findOne({_id: roomId})
      .populate({
        path: "messages",
        select: "_id user content",
          populate: {
            path: "user",
            select: "_id name avatarUrl"
          }
      }).exec();
    console.log(room);
    if(!user || !room) {
      res.json({ 
        success: false    
      });
      return;
    }
    const userInRoom = await UserRoom.findOne({user: userId, room: roomId});
    if (userInRoom) {
      res.json({ 
        success: false    
      });
      return;
    }

    await UserRoom.create({
      _id: ObjectId(),
      user: userId,
      room: roomId
    });

    res.json({
      [roomId]: room,
      success: true
    });

  } catch (e) {
    console.log(e);
    res.json({ 
      success: false    
    });
  }
}

