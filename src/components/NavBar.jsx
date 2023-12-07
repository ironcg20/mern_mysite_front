import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SignIn from "./SignIn";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Container } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material"; // Optional: For resetting default styles
import { Tabs, Tab, Box } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "../app/store"; // Import the store
import { Grid } from "@material-ui/core";
// import { useNavigate } from "react-router-dom";
// import { _handleLogIn } from "";
import { handleLogIn, handleSignUp, handleLogOut } from "../reducers/userSlice"; // Import actions from slice

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Getting dispatch function
  const navigate = useNavigate();

  const _loginData = { email: "111", password: "111" };
  const _signUpData = { email: "dddad", password: "111" };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/todoView"); // Define your route paths accordingly
        break;
      case 1:
        navigate("/aboutUs");
        break;
      // Add more cases for additional tabs
      default:
        break;
    }
  };

  return (
    <>
      <AppBar
        title='ddd'
        postion='fixed'
        style={{
          background: "white",
        }}
      >
        <Toolbar>
          {/* <h1>ddd</h1> */}
          <IconButton edge='start' color='primary' aria-label='Menu'>
            <MenuIcon />
          </IconButton>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
            variant='scrollable'
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              minWidth: "500px",
              marginLeft: "30rem",
            }}
          >
            <Tab label='Todo View' style={{ color: "black" }} />
            <Tab label='About Us' />
            <Tab label='Our Services' />
            <Tab label='Contact Us' />
          </Tabs>

          <Grid container alignItems='center' justify='flex-end'>
            {user.loggedIn ? (
              <Grid item>
                <div style={{ display: "flex" }}>
                  <Typography
                    name='userEmail'
                    id='userEmail'
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0 2rem",
                      color: "#3f51b5",
                    }}
                  >
                    <PersonIcon style={{ marginRight: "0.5rem" }} />
                    {user.email}
                  </Typography>

                  <Button
                    onClick={() => dispatch(handleLogOut())}
                    variant='contained'
                    color='primary'
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Sign out
                  </Button>
                </div>
              </Grid>
            ) : (
              <Grid item>
                <div>
                  <Button
                    color='primary'
                    onClick={() => navigate("/signup")}
                    variant='contained'
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => navigate("/signin")}
                    variant='outlined'
                    style={{
                      margin: "0 0.5rem",
                    }}
                  >
                    Sign in
                  </Button>
                </div>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
