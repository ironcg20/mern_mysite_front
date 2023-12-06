import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logIn, logOut, setMessage, increment, decrement } from './userSlice'; // Import actions from slice
import axios from "axios";

const UserComponent = () => {
  const value = useSelector((state) => state.user.value); // Accessing the state from 'counter'
  const loggedIn=useSelector((state)=> state.user.loggedIn); // Accessing the state from '
  const email = useSelector((state)=> state.user.email); // Accessing the
  const password = useSelector((state)=> state.user.password);
  const message = useSelector((state)=> state.user.message); // Access

  const dispatch = useDispatch(); // Getting dispatch function
  const _loginData={email: "111", password: "111"};
  const _signUpData={email: "sdaaad", password: "111"};
  
  const handleLogin = (_data) => {
    axios
      .post("http://localhost:8000/api/user", _data) // Adjust the API endpoint for sign-in
      .then((res) => {
        const { id, message } = res.data;
        if (id) {
            dispatch(logIn({email: _data.email, password: _data.password}));
            console.log("[Received Data]\n" + "ID: " + id);
            console.log("Sign-in success!");
        } else {
            console.log("Sign-in failed!");
        }
      })
      .catch((err) => {
            console.log("User is not exist!");
            console.log(err.message);
      });
      
  };

  const handleSignUp = (_data) => {
    axios
      .post("http://localhost:8000/api/user/create", _data)
      .then((res) => {
        // const { id, message } = res.data;
        // console.log("ddddddd ",res.data.message);
        dispatch(setMessage(res.data.message));
        handleLogin(_data);
      })
      .catch((err) => {
        
        console.log("Error couldn't create USER");
        console.log(err.message);
        dispatch(setMessage(err.message));
      });
  };


  
  return (
    <div>
      <h1>Value: {value}</h1>
      <h1>LoggedIn: {loggedIn ? 1: 0}</h1>
      <h1>Email: {email==="" ? "<Empty!>" : email}</h1>
      <h1>Password: {password==="" ? "<Empty!>" : password}</h1>
      <h1>Message: {message}</h1>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => handleLogin(_loginData) }>Log-In</button>
      <button onClick={() => dispatch(logOut())}>Log-Out</button>
      <button onClick={() => handleSignUp(_signUpData)}>Sign-Up</button>
    </div>
  );
};

export default UserComponent;