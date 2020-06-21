import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';

const ENDPOINT = "http://localhost:6969";
let socket;

function Join() {
 
  let [count, setCount] = useState(1);
  let test = 1;
  
  if (!socket) {
    socket = io.connect(ENDPOINT);
    socket.on("receiveData", function(data) {
      setCount(count + 1);
      console.log(data);
    });
    console.log(socket);
  }


  return (
    <div onClick={() => {
      socket.emit("send-data", "data");
    }}>
      Hello socket.io
      <h1>{count}</h1>
    </div>
  );
}

export default Join;

