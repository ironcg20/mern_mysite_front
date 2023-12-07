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

const App = () => {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <div style={{ marginTop: "4rem" }}></div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/todoView' element={<TodoShow />} />
          <Route path='/todoAdd' element={<TodoInsert />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
