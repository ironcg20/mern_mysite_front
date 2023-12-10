import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { handleLogOut } from "../reducers/userReducer";
import {
  Typography,
  Button,
  Grid,
  Container,
  Paper,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      {currentUser.email === "" || currentUser.email === null ? (
        <div className={classes.root}>
          <Container maxWidth='sm'>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant='h2' gutterBottom>
                Welcome
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                Explore our amazing app.
              </Typography>
              <Box mt={4}>
                <Grid container spacing={2} justify='center'>
                  <Grid item>
                    <Link to={`/signin/`}>
                      <Button variant='outlined' color='primary'>
                        Sign In
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to={`/signup/`}>
                      <Button variant='contained' color='primary'>
                        Sign Up
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>
        </div>
      ) : (
        <div className={classes.root}>
          <Container maxWidth='sm'>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant='h2' gutterBottom>
                {currentUser.email}
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                Explore our amazing app.
              </Typography>
              <Box mt={4}>
                <Grid container spacing={2} justify='center'>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => dispatch(handleLogOut())}
                    >
                      Sign Out
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>
        </div>
      )}
    </>
  );
};

export default Home;
