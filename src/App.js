import React from "react";
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
