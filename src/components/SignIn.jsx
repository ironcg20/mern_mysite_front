import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper, Typography, Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { handleLogIn } from "../reducers/userReducer"; // Import actions from slice
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setTabIndex } from "../reducers/siteReducer";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const isSignInEnabled = data.email !== "" && data.password !== "";
  // const notify = (notify_text) => toast.success(notify_text);
  // const user = useSelector((state) => state.user);
  // const site = useSelector((state) => state.site);

  // const notify = () => toast.success("Notification message!");
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault(); // Prevent default form submission

    dispatch(
      handleLogIn({
        email: data.email,
        password: data.password,
      }),
    )
      .then(() => {
        dispatch(setTabIndex({ tabIndex: 1 }));
        toast.success("Login Successful!");
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
            error={!!error.email}
            helperText={error.email}
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
            error={!!error.password} // Set error state for TextField
            helperText={error.password} // Display error message if present
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
            disabled={!isSignInEnabled}
          >
            {loading ? (
              <CircularProgress
                style={{ color: "white", width: "20px", height: "20px" }}
              />
            ) : (
              " Sign In"
            )}

            {/* Render CircularProgress component */}
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
