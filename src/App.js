import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./app/store"; // Import the store
import axios from "axios";

import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  NavBar,
  TodoShow,
  TodoInsert,
  TodoUpdate,
  Home,
  SignUp,
  SignIn,
  Footer,
  NotFoundPage,
} from "./components";
import {
  logIn,
  logOut,
  setMessage,
  increment,
  decrement,
} from "./reducers/userReducer"; // Import actions from slice

import {
  set,
  reset,
  insertItem,
  deleteItem,
  updateItem,
} from "./reducers/todoReducer";

function gString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

function gNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App = () => {
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const setData1 = { _id: gNum(0, 100) };
  const setData2 = {
    // title: gString(3),
    description: gString(3),
    user: gNum(1000, 9999),
  };
  const insertData = {
    title: gString(3),
    description: gString(3),
    user: "6567fabc0169fd67bd6bffbf",
  };

  return (
    <div className='App'>
      <Router>
        <NavBar />
        <div style={{ marginTop: "4rem" }}></div>
        <Routes>
          <Route exact path='/home' element={<Home />} />
          <Route path='/todoView' element={<TodoShow />} />
          <Route path='/todoAdd' element={<TodoInsert />} />
          <Route path='/todoUpdate' element={<TodoUpdate />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
