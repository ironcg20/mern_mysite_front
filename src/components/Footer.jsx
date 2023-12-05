import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const handleTwitterDirectMessage = () => {
    // Replace the URL with your Twitter handle or direct message link
    window.open(
      "https://twitter.com/messages/compose?recipient_id=yourTwitterID",
    );
  };

  const handleMessageClick = () => {
    window.location.href = "mailto:your.email@example.com";
  };

  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='body1' color='inherit'>
              © 2023 Your Website
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              color='inherit'
              aria-label='direct-message'
              onClick={handleTwitterDirectMessage}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color='inherit'
              aria-label='send-message'
              onClick={handleMessageClick}
            >
              <EmailIcon />
            </IconButton>
            <IconButton color='inherit' aria-label='facebook'>
              <FacebookIcon />
            </IconButton>
            <IconButton color='inherit' aria-label='linkedin'>
              <LinkedInIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant='body1' color='inherit'>
              Contact Us: contact@example.com | Phone: +123456789
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
