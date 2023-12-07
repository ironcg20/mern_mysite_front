import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "80vh", // Adjusted height for better visibility
    gap: theme.spacing(3), // Spacing between elements
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.errorContainer}>
      <Typography variant='h1'>404</Typography>
      <Typography variant='h4'>Oops! Page not found</Typography>
      <Typography variant='body1'>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button component={Link} to='/' variant='contained' color='primary'>
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
