import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut, setMessage, increment, decrement } from "./userSlice"; // Import actions from slice
import axios from "axios";

const UserComponent = () => {
  //   const value = useSelector((state) => state.user.value); // Accessing the state from 'counter'
  //   const loggedIn=useSelector((state)=> state.user.loggedIn); // Accessing the state from '
  //   const email = useSelector((state)=> state.user.email); // Accessing the
  //   const password = useSelector((state)=> state.user.password);
  //   const message = useSelector((state)=> state.user.message); // Access

  const dispatch = useDispatch(); // Getting dispatch function
  const _loginData = { email: "111", password: "111" };
  const _signUpData = { email: "sda2345", password: "111" };

  const handleLogIn = (_data) => {
    axios
      .post("http://localhost:8000/api/user", _data) // Adjust the API endpoint for sign-in
      .then((res) => {
        const { id, message } = res.data;
        if (id) {
          dispatch(logIn({ email: _data.email, password: _data.password }));
          console.log("[Received Data]\n" + "ID: " + id);
          console.log("Sign-in success!");
        } else {
          dispatch(setMessage(message));
          console.log("Sign-in failed!");
        }
      })
      .catch((err) => {
        dispatch(setMessage(err.message));
        console.log("User is not exist!");
        console.log(err.message);
      });
  };

  const handleSignUp = (_data) => {
    axios
      .post("http://localhost:8000/api/user/create", _data)
      .then((res) => {
        dispatch(setMessage(res.data.message));
        handleLogIn({ email: _data.email, password: _data.password });
      })
      .catch((err) => {
        dispatch(setMessage(err.message));
      });
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <h1>Value: {user.value}</h1>
      <h1>LoggedIn: {user.loggedIn ? "true" : "false"}</h1>
      <h1>Email: {user.email === "" ? "<Empty!>" : user.email}</h1>
      <h1>Password: {user.password === "" ? "<Empty!>" : user.password}</h1>
      <h1>Message: {user.message}</h1>

      <button onClick={() => handleLogIn(_loginData)}>Log-In</button>
      <button onClick={() => handleLogOut()}>Log-Out</button>
      <button onClick={() => handleSignUp(_signUpData)}>Sign-Up</button>
    </div>
  );
};

export const { handleLogIn, handleLogOut, handleSignUp } = UserComponent;

export default UserComponent;
