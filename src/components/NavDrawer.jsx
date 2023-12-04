import React from "react";
// import { makeStyles } from "@mui/styles";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const NavDrawer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        // style={{ padding: "1rem" }}
      >
        <Toolbar />
        <List>
          {["Home", "About", "Services", "Contact"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography paragraph>Your main content goes here.</Typography>
      </main>
    </div>
  );
};

export default NavDrawer;
