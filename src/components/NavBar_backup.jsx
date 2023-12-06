import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
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

const style = {
  flexGrow: 1,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const NavBar = ({
  handleSignIn,
  handleSignUp,
  loggedIn,
  handleSignOut,
  userEmail,
}) => {
  const { _id } = useParams();
  const [value, setValue] = useState(0);
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [userEmail, setUserEmail] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const disp = () => {
    console.log("This is: " + _id);
  };

  // useEffect(
  //   () => {
  //     axios
  //       .get("http://localhost:8000/api/todo", {
  //         params: {
  //           user: user,
  //         },
  //       })
  //       .then((res) => {
  //         console.log("User: " + user);
  //         console.log("Intialize: " + res.data);
  //         console.log(
  //           "%s %s",
  //           res.data.title,
  //           res.data.description,
  //           res.data.user,
  //         );
  //         setTodo(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   },
  //   [_id], // updated
  // );

  // const handleSignIn = () => {
  //   setLoggedIn(true)
  // };
  // const handleSignOut = () => {
  //   // Handle sign out logic here
  //   setLoggedIn(false);
  //   setUserEmail("");
  // };

  // const handleSignIn = () => {
  //   // Handle sign out logic here
  //   setLoggedIn(true);
  //   setUserEmail("");
  // };

  // const handleLoginSuccess = (userEmail) => {
  //   // Handle successful login logic here, set the user name and login status
  //   console.log("Navvar Loginstate: " + loggedIn);
  //   setLoggedIn(true);
  //   setUserEmail(userEmail);
  // };
  // const [user, setUser] = useState("");

  // return (
  //   <div>
  //     <AppBar position='static'>
  //       <Toolbar>
  //         <IconButton edge='start' color='inherit' aria-label='Menu'>
  //           <MenuIcon />
  //         </IconButton>
  //         <Typography variant='h6' style={style}>
  //           Mern Stack Todo List
  //         </Typography>
  //         {/* <Route path='/signup'  /> */}

  //         <p name='userName' id='userName'></p>
  //         <Link to={`/signin/`}>
  //           <Button onClick={handleSignIn}>Sign in</Button>
  //         </Link>
  //         <Link to={`/signup/`}>
  //           <Button onClick={handleSignUp}>Sign Up</Button>
  //         </Link>
  //       </Toolbar>
  //     </AppBar>
  //   </div>
  // );
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar
          style={{
            background: "white",
          }}
        >
          <IconButton
            edge='start'
            color='inherit'
            aria-label='Menu'
            onClick={toggleDrawer(true)}
            style={{
              color: "#3f51b5",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h6'
            component={Link}
            to='/'
            style={{
              // background: 'white',
              color: "#3f51b5",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            DRAGER
          </Typography>
          <div>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab label='Products' style={{ color: "black" }} />
              <Tab label='About Us' />
              <Tab label='Our Services' />
              <Tab label='Contact Us' />
            </Tabs>
            {/* <TabPanel value={value} index={0}>
              Content for Tab 1
            </TabPanel>
            <TabPanel value={value} index={1}>
              Content for Tab 2
            </TabPanel>
            <TabPanel value={value} index={2}>
              Content for Tab 3
            </TabPanel> */}
          </div>
          <div></div>
          {loggedIn && (
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
              {userEmail}
            </Typography>
          )}
          {loggedIn ? (
            <Link to={`/`}>
              <Button
                onClick={handleSignOut}
                variant='contained'
                color='primary'
              >
                Sign out
              </Button>
            </Link>
          ) : (
            <div
            // style={{ width: "300px", display: "flex", justifyContent: "end" }}
            >
              <Link to={`/signin/`}>
                <Button
                  onClick={handleSignIn}
                  color='primary'
                  style={{
                    margin: "0 0.5rem",
                  }}
                >
                  Sign in
                </Button>
              </Link>
              <Link to={`/signup/`}>
                <Button
                  onClick={handleSignUp}
                  variant='contained'
                  color='primary'
                  // style={{
                  //   background: "#333e79",
                  //   // color: "#3f51b5", // Primary color
                  // }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        style={{ padding: "rem" }}
      >
        <Typography>User Name</Typography>
        <List>
          <ListItem button onClick={toggleDrawer(false)}>
            <Typography>Drawer Item 1</Typography>
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <Typography>Drawer Item 2</Typography>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default NavBar;