import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from  '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';


import { MessageContext } from '../Store/MessageStore';

const useStyles = makeStyles(theme => ({
  form: {
    position: "absolute",
    top: "30%",
    left: "45%",
    width: "300px",
    height: "250px",
    backgroundColor: "#FFF",
    borderRadius: "4px",
    padding: "30px",
    
  },
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 100,
    backgroundColor: "#000000a6"
  },
  textField: {
    width: "100%",
    marginBottom: "40px"
  },
  button: {
    margin: "2px"
  }
}))

function CreateRoom(props) {
  const [roomName, setRoomName] = useState('');
  const [disableBtn, changeDisable] = useState(false);
  const [error, setError] = useState(false);

  const [displayState, changeDisplayState] = useState(false);
  const classes = useStyles();
  const { dispatch } = useContext(MessageContext);

  const doJoinRoom = async (e) => {
    e.preventDefault();
    try {
      changeDisable(true);
      const res = await axios.post('/room/create', {
        roomName: roomName
      });
      const data = res.data;
      if (!data.success) {
        setError(true);
        changeDisable(false);
        return;
      }
      delete data.success;
      dispatch({
        type: "JOIN_NEW_ROOM",
        payload: data
      });
      setRoomName("");
      changeDisplayState(false);
      changeDisable(false);
    } catch (e) {
      setError(true);
      changeDisable(false);
      console.log(e);
    }
  }
  
  const displayForm = () => {
    changeDisplayState(true);
  }
  
  const hiddenForm = () => {
    changeDisplayState(false);
    setRoomName("");
    setError(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={displayForm}>
        Create new room
      </Button>
      { displayState &&
        <div className={classes.container}>
          <form onSubmit={doJoinRoom} className={classes.form}>
            <h3>Create New Room</h3>
            {error ? <Alert severity="error">Can't create room</Alert> : <div style={{width: "100%", height:"20px"}}></div>}
            <TextField 
              label="Type Room Name" 
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className={classes.textField}
            />
            <Button
              type="submit" 
              variant="outlined" 
              color="primary" 
              size="small"
              className={classes.button}
              disabled={disableBtn}
            >
              Submit
            </Button>
            <Button
              type="button" 
              variant="outlined" 
              color="primary" 
              size="small"
              onClick={hiddenForm}
              className={classes.button}

            >
              Close
            </Button>
          </form>
        </div>
      }
    </div>
  );

}

export default CreateRoom;
