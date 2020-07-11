import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from  '@material-ui/core';

const useStyles = makeStyles(theme => ({
  active: {
    color: "#fff",
    backgroundColor: "#1976d2",
    transition: "0.5s",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#1976d2",
      opacity: "0.8"
    }
  }
}))

function RoomItem(props) {

  const classes = useStyles();
  const [isActive, changeActive] = useState(false);
  const {primary, roomId, currentRoom, ...rest} = props;

  useEffect(() => {
    if (roomId === currentRoom) {
      changeActive(true);
    } else {
      changeActive(false);
    }
  }, [primary, currentRoom, roomId]);
  console.log("RoomItem")
  return (
    <ListItem {...rest} className={isActive ? classes.active : ""} button>
      <ListItemText primary={primary} />
    </ListItem>
  );

}

export default RoomItem;
