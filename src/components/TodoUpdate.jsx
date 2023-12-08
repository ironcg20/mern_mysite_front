// src/components/TodoUpdate.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import NavBar from "./NavBar";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Fab from "@mui/material/Fab";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  set,
  reset,
  insertItem,
  deleteItem,
  updateItem,
} from "../reducers/todoReducer";

export default function TodoUpdate() {
  const location = useLocation();
  const _user = useSelector((state) => state.todo);
  const { _id, title, description, user } = _user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    _id: _id,
    title: title,
    description: description,
    user: user,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const todo = {
    title: data.title,
    description: data.description,
    user: data.user,
  };

  const handleSubmit = (e) => {
    const id = _id;
    e.preventDefault();

    dispatch(
      updateItem({
        _id: _id,
        title: todo.title,
        description: todo.description,
        user: _user.user,
      }),
    );
    axios
      .put(`http://localhost:8000/api/todo/${id}`, todo)
      .then((res) => {
        setData({ title: "", description: "", user: user });
        goBack();
      })
      .catch((err) => {
        console.log("Failed to update todo");
        console.log(err.message);
      });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Container style={{ padding: "20px", height: "900px" }}>
        <Fab
          color='secondary'
          aria-label='go-back'
          variant='contained'
          // color='primary'
          onClick={goBack}
        >
          <ArrowBackIcon />
        </Fab>
        <form
          className='form-container'
          onSubmit={handleSubmit}
          style={{ paddingTop: "30px" }}
        >
          <TextField
            type='text'
            name='title'
            value={data.title}
            onChange={handleChange}
            placeholder='Title'
            fullWidth
            className='input'
            style={{ height: "80px" }}
          />
          <TextField
            type='text'
            name='description'
            value={data.description}
            onChange={handleChange}
            placeholder='Description'
            fullWidth
            className='input'
            style={{ height: "80px" }}
          />
          <Button type='submit' variant='contained' color='primary'>
            Update
          </Button>
        </form>
      </Container>
    </>
  );
}

// export default TodoUpdate;
