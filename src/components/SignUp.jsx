import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper, Typography } from "@material-ui/core";

import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    width: "300px",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  //   const handleSignUp = () => {
  //     // Implement your signup logic here
  //     console.log(`Email: ${email}, Password: ${password}`);
  //   };

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      email: data.email,
      password: data.password,
    };

    console.log({ user });
    axios
      .post("http://localhost:8000/api/user", user)
      .then((res) => {
        setData({ email: "", password: "" });
        navigate("/");
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create USER");
        console.log(err.message);
      });
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.form}>
        <form onSubmit={handleSubmit} className='form-container' noValidate>
          <Typography variant='h5' gutterBottom>
            Sign Up
          </Typography>
          <TextField
            className={classes.textField}
            label='Email'
            variant='outlined'
            fullWidth
            value={data.email}
            onChange={handleChange}
            name='email'
          />
          <TextField
            className={classes.textField}
            label='Password'
            variant='outlined'
            type='password'
            fullWidth
            value={data.password}
            onChange={handleChange}
            name='password'
          />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default SignUp;
