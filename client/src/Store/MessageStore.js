import React, { useReducer, useEffect, useState } from 'react';

import axios from 'axios';
import io from 'socket.io-client';

export const MessageContext = React.createContext();

const initialState = {};

const reducer = function(state, action) {
  const { roomId, fromUser, msg } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [roomId]: {
          ...state[roomId],
          messages: [
            ...state[roomId].messages,
            { 
              user: fromUser,
              content: msg
            }
          ]
        }
      };
    case "RECEIVE_DATA_FROM_SERVER": 
      return action.payload;
    default:
      throw new Error("Type of action no exist");
  }
}
    
let socket;
const PATH = 'localhost:6969';
 
function sendChatAction(payload) {
  socket.emit("chat message", payload);
}

function MessageStore(props) {
  const { children } = props;  
  const [allChats, dispatch] = useReducer(reducer, initialState);

  const [loading, changeLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:6969/data/getMessage");
        const data = res.data;
        if (!data.success) {
          return;
        }
        dispatch({
          type: "RECEIVE_DATA_FROM_SERVER",
          payload: data.allMessage
        });
        changeLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
    socket = io(PATH);
    socket.on("chat message", function(payload) {
      dispatch({
        type: "RECEIVE_MESSAGE",
        payload: payload
      })
    });
  }, []);

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <MessageContext.Provider 
      value={{
        allChats, 
        sendChatAction,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export default MessageStore;
