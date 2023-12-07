// src/components/createTodo.jsx

import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import Fab from "@mui/material/Fab";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

const TodoInsert = () => {
  const _user = useSelector((state) => state.user);
  // const { user } = _user._id;
  const [data, setData] = useState({
    title: "",
    description: "",
    user: _user._id,
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const todo = {
      _id: uuidv4(),
      title: data.title,
      description: data.description,
      user: _user._id,
    };

    console.log(todo._id, todo.title, todo.description, todo.user);

    axios
      .post("http://localhost:8000/api/todo/", todo)
      .then((res) => {
        setData({ title: "", description: "", user: _user._id });
        goBack();
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });
  }

  const goBack = () => {
    navigate(-1);
  };

  const isTitleNotEmpty = data.title.trim() !== "";

  return (
    <>
      <p>{data._id}</p>
      <Container
        className='container'
        style={{ padding: "20px", height: "900px" }}
      >
        <Fab
          color='secondary'
          aria-label='go-back'
          variant='contained'
          // color='primary'
          onClick={goBack}
        >
          <ArrowBackIcon />
        </Fab>

        <section className='contents'>
          <h1>Add List</h1>
          <form onSubmit={handleSubmit} className='form-container' noValidate>
            <TextField
              type='text'
              name='title'
              value={data.title}
              onChange={handleChange}
              placeholder='Title'
              fullWidth
              className='input'
              style={{ height: "80px", width: "30%" }}
            />
            <br></br>
            <TextField
              type='text'
              name='description'
              value={data.description}
              onChange={handleChange}
              placeholder='Description'
              fullWidth
              className='input'
              style={{ height: "80px", width: "30%" }}
            />
            <br></br>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='button'
              disabled={!isTitleNotEmpty}
            >
              Create
            </Button>
          </form>
        </section>
      </Container>
    </>
  );
};

export default TodoInsert;
