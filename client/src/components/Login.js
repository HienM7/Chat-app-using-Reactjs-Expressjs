import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '../Store/UserStore';

const useStyles = makeStyles(theme => ({
  LoginPage: {
    marginTop: "100px",
    width: "550px",
    margin: "0 auto",
    padding: theme.spacing(3, 2),
    paddingBottom: "50px"
  },
  disableButton: {
    opacity: 0.5,
    width: "80%",
    padding: "10px",
    marginTop: "20px",
    backgroundColor: "#1976d2"
  },
  
  alert: {
    width: "80%",
    margin: "0 auto"
  },
  input: {
    width: "80%",
    marginBottom: "20px"
  },
  button: {
    width: "80%",
    padding: "10px",
    marginTop: "20px",
    backgroundColor: "#1976d2",
    "&:hover": {
      backgroundColor: "#115293",
    }
  },
  register: {
    marginTop: "30px",
    "& a": {
      color: "#1976d2",
      textDecoration: "none"
    }
  }
}))

function Login(props) {

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButton, changeDisableButton] = useState(false);
  const [alert, setAlert] = useState("");

  const { dispatch } = useContext(AuthenticationContext);

  const doLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setAlert("Please type your email");
      return;
    }
    if (!password) {
      setAlert("Please type your password");
      return;
    }

    changeDisableButton(true);

    try {
      let res = await axios.post(
        "http://localhost:6969/auth/doLogin",
        { email, password }
      );  
      let result = res.data;

      if (!result.success) {
        setAlert(result.msg);
        changeDisableButton(false);
        return;
      }
      axios.defaults.headers.common['x-access-token'] = result.token;
      localStorage.setItem('token', result.token);
      const user = {
        username: result.username,
        userId: result.userId,
        avatarUrl: result.avatarUrl,
        isConfirmation: result.isConfirmation
      }
      
      dispatch({
        type: "USER_LOGIN",
        payload: user
      });
      
    } catch (e) {
      console.log(e);
    } 

  } 
  return (
    <Paper className={classes.LoginPage} elevation={3}>
      <Typography variant="h3" component="h3">
        Login
      </Typography>
      <form className={classes.form} onSubmit={doLogin}>
        {alert && <Alert className={classes.alert} severity="error">{alert}</Alert>}
        <TextField
          className={classes.input}
          label="Email" 
          variant="filled"
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <TextField 
          className={classes.input}
          label="Password"
          type="password"
          variant="filled"
          onChange={(e) => {setPassword(e.target.value)}}
        />
        <Button
          type="submit"
          className={disableButton ? classes.disableButton : classes.button}
          variant="contained" 
          color="primary"
          disable={disableButton}
        >
          Login
        </Button>
      </form>
      <div className={classes.register}>Don't have any account? <Link to="/register">Register</Link></div>
    </Paper>
  );

}

export default Login;
