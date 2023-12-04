// src/components/updateTodo.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import NavBar from "./NavBar";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function UpdateTodo() {
  const { _id, title, description } = useParams();
  // const { _id } = useParams();
  const [data, setData] = useState({
    title: title,
    description: description,
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
    console.log("Name: " + e.target.name);
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ID: " + _id);
    axios
      .put(`http://localhost:8000/api/todo/${_id}`, data)
      .then((res) => {
        setData({ title: "", description: "" });
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
      <Container style={{ padding: "20px" }}>
        <Button variant='contained' color='primary' onClick={goBack}>
          <ArrowBackIcon />
          Back
        </Button>
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
