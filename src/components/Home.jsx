import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "@material-ui/core";

function Home() {
  return (
    <>
      <Container className='container' style={{ padding: "20px" }}>
        <h1>Sign in!</h1>
      </Container>
    </>
  );
}

export default Home;
