import React, { useReducer, useState, useEffect } from 'react';

import axios from 'axios';
export const AuthenticationContext = React.createContext();

const initialState = {
  isLoggedIn: false,
};

const reducer = function(state, action) {
  const { username, userId, avatarUrl } = action.payload;

  switch (action.type) {
    case "USER_LOGIN":
      return {
        isLoggedIn: true,
        username,
        userId,
        avatarUrl
      };
    case "USER_LOGOUT": 
      return {
        isLoggedIn: false,
        username: "",
        userId: "",
        avatarUrl: ""
      };
    default:
      throw new Error("Type of action no exist");
  }
}
    
function UserStore(props) {
  const { children } = props; 

  const [userInfo, dispatch] = useReducer(reducer, initialState);
  const [loading, changeLoading] = useState(true);


  useEffect(() => {

    const fetchData = async () => {
      try {
        let res = await axios.post(
          "http://localhost:6969/auth/checkLogin",
            {
              token: localStorage.getItem('token')
            }
        );
        let result = res.data;
        if (!result.success) {
          changeLoading(false);
          return;
        }
        axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
        const user = {
          username: result.username,
          userId: result.userId,
          avatarUrl: result.avatarUrl,
        }
    
        dispatch({
          type: "USER_LOGIN",
          payload: user
        });
        changeLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <AuthenticationContext.Provider 
      value={{
        userInfo, 
        dispatch,
      }}
    >
      { children }
    </AuthenticationContext.Provider>
  );
}

export default UserStore;

