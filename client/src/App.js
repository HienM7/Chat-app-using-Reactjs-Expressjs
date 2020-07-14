import React, { useContext } from 'react';
import './App.css';

import DashBoard from './components/DashBoard';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Login from './components/Login';
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
                  <DashBoard />
                </Route>
            </div>
          </MessageStore>
        ) : (
          <div className="App">
                <Route path="/">
                  <Login />
                </Route>
            </div>
        )
      }
    </Router>
  );
}

export default App;
