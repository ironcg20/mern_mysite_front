import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import SignUp from "./SignUp";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const style = {
  flexGrow: 1,
};
const NavBar = ({ handleSignIn, handleSignUp }) => {
  const { _id } = useParams();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const disp = () => {
    console.log("This is: " + _id);
  };
  useEffect(
    () => {
      // axios
      //   .get("http://localhost:8000/api/todo", {
      //     params: {
      //       user: user,
      //     },
      //   })
      //   .then((res) => {
      //     console.log("User: " + user);
      //     console.log("Intialize: " + res.data);
      //     console.log("%s %s", res.data.title, res.data.description);
      //     setTodo(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
    },
    [_id], // updated
  );
  const handleSignOut = () => {
    // Handle sign out logic here
    setLoggedIn(false);
    setUserEmail("");
  };

  const handleLoginSuccess = (userEmail) => {
    // Handle successful login logic here, set the user name and login status
    setLoggedIn(true);
    setUserEmail(userEmail);
  };
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
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          {/* <Link to={`/`}> */}
          <Typography variant='h6' style={style}>
            Mern Stack Todo List
          </Typography>
          {/* </Link> */}

          <p>{disp}</p>
          {loggedIn && (
            <p name='userEmail' id='userEmail'>
              {userEmail}
            </p>
          )}
          {loggedIn ? (
            <Button onClick={handleSignOut}>Sign out</Button>
          ) : (
            <>
              <Link to={`/signin/`}>
                <Button onClick={handleSignIn}>Sign in</Button>
              </Link>
              <Link to={`/signup/`}>
                <Button onClick={handleSignUp}>Sign Up</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
