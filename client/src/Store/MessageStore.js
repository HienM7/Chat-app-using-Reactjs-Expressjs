import React, { useReducer, useEffect, useState } from 'react';

// import axios from 'axios';
import io from 'socket.io-client';

export const MessageContext = React.createContext();

const initialState = {};

const fakeData = {
  general: [
    {from: "userId", name: "aaron", msg: "hello everyone"},
    {from: "userId", name: "aaron2", msg: "hello everyone"},
    {from: "userId", name: "aaron3", msg: "hello everyone"},
  ],
  music: [
    {from: "userId", name: "Thor", msg: "hi Avenger"},
    {from: "userId", name: "IronMan", msg: "hello everyone"},
    {from: "userId", name: "Captain", msg: "Avenger assemble!"},
  ]

}

const reducer = function(state, action) {
  const { room, from, msg, name } = action.payload;
  // if (!state[room]) {
  //   state[room] = [];
  // }
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [room]: [
          ...state[room],
          { name, from, msg }
        ]
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
  
  const [allChats, dispatch] = useReducer(reducer, initialState);

  const [loading, changeLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await setTimeout(() => {
          dispatch({
            type: "RECEIVE_DATA_FROM_SERVER",
            payload: fakeData
          })
          changeLoading(false);
        }, 3000);
        
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

  console.log("hello");
  if (loading) {
    return <h3>Loading...</h3>
  }
  console.log(allChats);

  return (
    <MessageContext.Provider 
      value={{
        allChats, 
        sendChatAction,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageStore;
