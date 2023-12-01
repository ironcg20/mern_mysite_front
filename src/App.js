import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowTodoList from "./components/showTodoList";
import CreateTodo from "./components/createTodo";
import UpdateTodo from "./components/updateTodo";
import App_ from "./components/App_";
import "./App.scss";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [data, setData] = useState({ email: "", password: "" });

  const handleSignIn = async () => {
    try {
      const user = await SignIn("email", "password"); // Call the signIn function with actual credentials
      handleLoginSuccess(user.email); // Assuming you have a function to handle successful login
    } catch (error) {
      console.error("Sign-in failed", error);
      // Handle sign-in error (e.g., display error message)
    }
  };

  const handleSignUp = async () => {
    try {
      const user = await SignUp("email", "password"); // Call the signUp function with actual credentials
      handleLoginSuccess(user.email); // Assuming you have a function to handle successful login
    } catch (error) {
      console.error("Sign-up failed", error);
      // Handle sign-up error (e.g., display error message)
    }
  };

  const handleLoginSuccess = (email) => {
    // Update state or perform actions upon successful login
    console.log("Logged in as:", email);
  };

  return (
    <div className='app-contents'>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/user/:user' element={<ShowTodoList />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/create-todo/:user' element={<CreateTodo />} />
          <Route path='/update-todo/:_id' element={<UpdateTodo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
