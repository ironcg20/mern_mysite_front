import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper, Typography, Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { handleLogIn } from "../features/user/userSlice"; // Import actions from slice
import { useDispatch, useSelector } from "react-redux";
import "../index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    width: "300px",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const SignIn = ({ handleLoginSuccess }) => {
  const classes = useStyles();
  const [data, setData] = useState({ email: "", password: "" });
  const dispatch = useDispatch(); // Getting dispatch function
  const navigate = useNavigate();

  function handleChange(e) {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   console.log(
  //     "[Submit data]\n" +
  //       "Email: " +
  //       data.email +
  //       " Password: " +
  //       data.password,
  //   );
  //   axios
  //     .post("http://localhost:8000/api/user", data) // Adjust the API endpoint for sign-in
  //     .then((res) => {
  //       const { id, message } = res.data;
  //       if (id) {
  //         console.log("[Received Data]\n" + "ID: " + id);
  //         console.log("Sign-in success!");
  //         handleLoginSuccess(data.email);
  //         navigate(`/user/${id}`);
  //       } else {
  //         console.log("Sign-in failed!");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("User is not exist!");
  //       console.log(err.message);
  //     });
  // }

  const isSignInEnabled = data.email !== "" && data.password !== "";

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(handleLogIn({ email: data.email, password: data.password }));
    navigate("/todoView");
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.form}>
        <form onSubmit={handleSubmit} className='form-container' noValidate>
          <Typography variant='h5' gutterBottom>
            Sign In
          </Typography>
          <TextField
            className={classes.textField}
            label='Email'
            variant='outlined'
            fullWidth
            value={data.email}
            onChange={handleChange}
            name='email'
          />
          <TextField
            className={classes.textField}
            label='Password'
            variant='outlined'
            type='password'
            fullWidth
            value={data.password}
            onChange={handleChange}
            name='password'
          />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
            disabled={!isSignInEnabled}
          >
            Sign In
          </Button>
          {/* <div class='m-top'>
            <GoogleLogin
              clientId='YOUR_CLIENT_ID' // Replace with your Google OAuth client ID
              buttonText='Login with Google'
              onSuccess={responseGoogle}
              onFailure={responseGoogle} // Handle failure if needed
              cookiePolicy={"single_host_origin"}
              className='full-width-google-button' // Assign a class for full width
            />
          </div> */}
        </form>
      </Paper>
    </div>
  );
};

export default SignIn;
