// src/components/updateTodo.jsx

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

export default function UpdateTodo() {
  // const { _id, title, description } = useParams();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const _id = params.get("_id");
  const title = params.get("title");
  const description = params.get("description");
  const user = params.get("user");

  // console.log("Params:", _id, title, description);
  // const { _id } = useParams();
  const [data, setData] = useState({
    _id: _id,
    title: title,
    description: description,
    user: user,
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/todo/${_id}`)
  //     .then((res) => {
  //       console.log("_id: " + _id);
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Loading error");
  //     });
  // }, [_id]);

  const handleChange = (e) => {
    // console.log("Name: " + e.target.name);
    const { name, value } = e.target;
    // console.log("Changed: ", name, " - ", value);
    setData((data) => ({ ...data, [name]: value }));
    // console.log("Data: ", data.title, data.description, data.user);
  };

  const todo = {
    title: data.title,
    description: data.description,
    user: data.user,
  };

  const handleSubmit = (e) => {
    const id = _id;
    e.preventDefault();
    console.log("[Submit]\n");
    console.log("ID: ", _id, "\n");
    console.log(data.title, data.description, data.user);
    console.log("[/Submit]");
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
      {/* {)} */}
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
