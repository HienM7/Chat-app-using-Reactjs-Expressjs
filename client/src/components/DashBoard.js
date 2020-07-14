import React, { useState, useContext } from 'react';

import { Paper, List, Typography, TextField, Button, Chip, Avatar  } from  '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import RoomItem from './RoomItem';
import AccountMenu from './AccountMenu';
import { MessageContext } from '../Store/MessageStore';
import ScrollToBottom from 'react-scroll-to-bottom';
import { AuthenticationContext } from '../Store/UserStore';

const useStyles = makeStyles(theme => ({
  DashBoard: {
    marginTop: "20px",
    width: "80%",
    margin: "0 auto",
    padding: theme.spacing(3, 2),
    paddingBottom: "50px",
    position: "relative"
  },
  username: {
    position: "absolute",
    top: "10px",
    right: "20px",
    fontSize: "20px"
  },
  flex: {
    display: "flex",
    padding: "10px",
    alignItems: "center"
  },
  roomWindow: {
    width: "30%",
    height: "450px",
    // borderRight: "1px solid rgba(0, 0, 0, 0.2)",
  },
  roomDetails: {
    display: "flex",
    justifyContent: "Space-Between",
    alignItems: "center"
  },
  chatWindow: {
    width: "70%",
    boxShadow: "-5px 0 10px rgba(0, 0, 0, 0.2)"
    
  },
  messageWindow: {
    height: "400px",
    marginBottom: "10px",
  }
  ,
  chatBox: {
    marginLeft: "20px",
    flexGrow: 1
  },
  button: {
    marginTop: "15px",
    marginLeft: "10px",
    height: "30px",
    width: "100px",
    backgroundColor: "#1976d2",
    "&:hover": {
      backgroundColor: "#115293",
    }
  },
  chip: {
    marginRight: "5px",
    float: "right"
  },
  friendAccount: {
    display: "flex",
    padding: "10px",
    alignItems: "center"
  },
  myAccount: {
    display: "flex",
    padding: "10px",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  flexSpaceBetween: {
    display: "flex",
    justifyContent: "SpaceBetween"
  }

}))

function DashBoard(props) {

  const classes = useStyles();  
  const { allChats, sendChatAction } = useContext(MessageContext);
  const { userInfo } = useContext(AuthenticationContext);
  const listRoom = Object.keys(allChats);

  const [currentRoom, changeCurrentRoom] = useState(listRoom[0]);
  const [message, setMessage] = useState(""); 
  const token = localStorage.getItem('token');

  const doChangeRoom = (room) => {
    changeCurrentRoom(room);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendChatAction({
      token: token,
      msg: message.trim(),
      roomId: currentRoom 
    });
    setMessage("");
  }
  console.log(userInfo.userId);
  return (
    <Paper className={classes.DashBoard} elevation={3} >
      <Typography variant="h3" component="h3">
        Chat app
      </Typography>
      <Typography className={classes.username} variant="p" component="p">
        <AccountMenu>
          {userInfo.username}
        </AccountMenu>
      </Typography>
      <div className={classes.roomDetails}>
        Room Id: {currentRoom}
        <div className={classes.flex}>
        <CreateRoom />
        <JoinRoom />
        </div>
      </div>
      <div className={classes.flex}>
        <ScrollToBottom mode="top" className={classes.roomWindow}>
          <List>
            {
              listRoom.map( (roomId, index) => 
                <RoomItem 
                  key={index}
                  roomId={roomId}
                  primary={allChats[roomId].name} 
                  currentRoom={currentRoom}
                  onClick={() => doChangeRoom(roomId)}
                />
              )
            }
          </List>
        </ScrollToBottom>
        <div className={classes.chatWindow}>
          <ScrollToBottom className={classes.messageWindow}>
            {
              allChats[currentRoom].messages.map( (message, index) => (
                <div 
                  className={
                    (userInfo.userId === message.user._id ) ?
                    classes.myAccount : classes.friendAccount
                  } 
                  key={index}

                >
                  <Chip
                    avatar={<Avatar alt="avatar" src={message.user.avatarUrl ? message.user.avatarUrl : "/avatarDefault.png"} />}
                    label={message.user.name}
                    className={classes.chip}
                  />
                  <Typography>{message.content}</Typography>
                </div>

              ))
            }
          </ScrollToBottom>
          <form onSubmit={sendMessage}>
            <div className={classes.flex}>
              <TextField 
                className={classes.chatBox} 
                label="Send a message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit" 
                variant="contained" 
                color="primary" 
                className={classes.button} 
                size="small"
              >
                Send
              </Button>
            </div>
          </form>
          
        </div>
      </div>
      
    </Paper>

  );

}

export default DashBoard;

