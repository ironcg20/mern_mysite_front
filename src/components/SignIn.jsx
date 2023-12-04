import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const SignIn = ({ handleLoginSuccess }) => {
  const classes = useStyles();
  const [data, setData] = useState({ email: "", password: "" });
  const [id, setID] = useState("");
  const navigate = useNavigate();

  // const { _id } = useParams();
  // const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  function handleChange(e) {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(
      "[Submit data]\n" +
        "Email: " +
        data.email +
        " Password: " +
        data.password,
    );
    axios
      .post("http://localhost:8000/api/user", data) // Adjust the API endpoint for sign-in
      .then((res) => {
        const { id, message } = res.data;
        if (id) {
          console.log("[Received Data]\n" + "ID: " + id);
          console.log("Sign-in success!");
          handleLoginSuccess(data.email);
          navigate(`/user/${id}`);
        } else {
          console.log("Sign-in failed!");
        }
      })
      .catch((err) => {
        console.log("User is not exist!");
        console.log(err.message);
      });
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.form}>
        <form onSubmit={handleSubmit} className='form-container' noValidate>
          <Typography variant='h5' gutterBottom>
            Sign In
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
            Sign In
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default SignIn;
