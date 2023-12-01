import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

import NavBar from "./NavBar";

const App_ = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleSignUp = () => {
    console.log(`New user signed up: ${username}`);
    setLoggedIn(true);
  };

  return (
    <div>
      <NavBar/>
      {!loggedIn ? (
        <div>
          <Button variant='contained' onClick={() => setShowSignUpDialog(true)}>
            Sign Up
          </Button>
          <Button variant='contained' onClick={handleLogin}>
            Login
          </Button>
        </div>
      ) : (
        <Button variant='contained' onClick={handleLogout}>
          Logout
        </Button>
      )}
      {loggedIn && <p>Welcome! You are logged in as {username}.</p>}

      <Dialog
        open={showSignUpDialog}
        onClose={() => setShowSignUpDialog(false)}
      >
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <TextField
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignUp} color='primary'>
            Sign Up
          </Button>
          <Button onClick={() => setShowSignUpDialog(false)} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App_;
