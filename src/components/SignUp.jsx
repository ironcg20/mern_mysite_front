import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper, Typography } from "@material-ui/core";

import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Container } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  handleLogIn,
  handleSignUp,
  handleLogOut,
} from "../reducers/userReducer"; // Import actions from slice
import { circularProgressClasses } from "@mui/material";

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

const SignUp = ({ handleLoginSuccess }) => {
  const classes = useStyles();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Getting dispatch function

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    setError({ ...error, [e.target.name]: "" }); // Clear error message on input change
  }

  const handleSignIn = () => {
    setLoading(true);

    dispatch(
      handleLogIn({
        email: data.email,
        password: data.password,
      }),
    )
      .then(() => {
        navigate("/todoView");
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError({ ...error, email: "User Not Found!" });
        } else if (error.response && error.response.status === 401) {
          setError({ ...error, password: "Incorrect password!" });
        } else if (error.response && error.response.status === 500) {
          setError({ ...error, email: "Error finding user" });
        } else {
          setError({
            ...error,
            email: "Unknown Error!",
            password: "Unknown Error!",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      setError({ ...error, email: "Invalid email address" }); // Set error message for email validation failure
      setLoading(false);
      return;
      // return;
    }

    // Password validation: Minimum 8 characters, at least one letter, one number, and one special character
    // const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // if (!passwordPattern.test(data.password)) {
    //   setError({
    //     ...error,
    //     password: "Password must be at least 8 characters long and contain one letter, one number, and one special character",
    //   }); // Set error message for password validation failure
    //   return;
    // }

    dispatch(handleSignUp({ email: data.email, password: data.password }))
      .then(() => {
        dispatch(handleLogIn({ email: data.email, password: data.password }));
        navigate("/todoView");
      })
      .catch((error) => {
        // setLoading(true);
        if (error.response && error.response.status === 400) {
          setError({ ...error, email: "Email exist already!" });
        } else {
          setError({ ...error, email: error.message });
        }
        // setLoading(false);
      })
      .finally(() => {
        console.log("Load ended!");
        setLoading(false);
      });
  }

  const isSignUpEnabled = data.email !== "" && data.password !== "";

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.form}>
        <form onSubmit={handleSubmit} className='form-container' noValidate>
          <Typography variant='h5' gutterBottom>
            Sign Up
          </Typography>
          <TextField
            className={classes.textField}
            label='Email'
            variant='outlined'
            fullWidth
            value={data.email}
            onChange={handleChange}
            name='email'
            error={!!error.email} // Set error state for TextField
            helperText={error.email} // Display error message if present
          />
          <TextField
            className={classes.textField}
            label='Password'
            variant='outlined'
            type={showPassword ? "text" : "password"} // Show/hide password based on state
            fullWidth
            value={data.password}
            onChange={handleChange}
            name='password'
            error={!!error.password}
            helperText={error.password}
            InputProps={{
              // Add InputProps to include the show/hide icon
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={togglePasswordVisibility}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant='body2' color='error'>
            {/* Display fail text above the signup button with red color */}
            {error.email || error.password}
          </Typography>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
            disabled={!isSignUpEnabled}
          >
            {loading ? (
              <CircularProgress
                style={{ color: "white", width: "20px", height: "20px" }}
              />
            ) : (
              " Sign Up"
            )}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default SignUp;
