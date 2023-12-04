// src/components/createTodo.jsx

import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

export default function CreateTodo() {
  const { user } = useParams();
  const [data, setData] = useState({ title: "", description: "", user: user });
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
      user: data.user,
    };

    axios
      .post("http://localhost:8000/api/todo/", todo)
      .then((res) => {
        setData({ title: "", description: "", user: user });
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

  return (
    <>
      <Container className='container' style={{ padding: "20px" }}>
        <Button variant='contained' color='primary' onClick={goBack}>
          <ArrowBackIcon />
          Back
        </Button>
        <section className='contents' style={{ paddingTop: "30px" }}>
          <form onSubmit={handleSubmit} className='form-container' noValidate>
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
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='button'
            >
              Create
            </Button>
          </form>
        </section>
      </Container>
    </>
  );
}
