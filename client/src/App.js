import React, { useContext } from 'react';
import './App.css';

import DashBoard from './components/DashBoard';
import ConfirmationAccount from './components/ConfirmationAccount';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import { AuthenticationContext } from './Store/UserStore';
import MessageStore from './Store/MessageStore';

function App() {
  const { userInfo } = useContext(AuthenticationContext);

  console.log("app")
  return (
    <Router>
      { userInfo.isLoggedIn ? ( 
          <MessageStore >
            <div className="App">
                <Route exact path="/">
                  { userInfo.isConfirmation ? <DashBoard /> : <ConfirmationAccount /> }
                </Route>
            </div>
          </MessageStore>
        ) : (
          <div className="App">
                <Route exact path="/">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
            </div>
        )
      }
    </Router>
  );
}

export default App;
