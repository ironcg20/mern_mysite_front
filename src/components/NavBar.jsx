import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import { Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { handleLogOut } from "../reducers/userReducer";
import { setTabIndex } from "../reducers/siteReducer";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const site = useSelector((state) => state.site);
  // const tabIndex = site.tabIndex;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    switch (site.tabIndex) {
      case 0:
        console.log("Home Reach");
        navigate("/home");
        break;
      case 1:
        navigate("/todoView");
        break;
      case 2:
        navigate("/aboutUs");
        break;
      case 3:
        navigate("/services");
        break;
      case 4:
        navigate("/contacts");
        break;
      default:
        break;
    }
    setRefresh(false);
  }, [refresh]);

  const handleChange = (event, _tabIndex) => {
    dispatch(setTabIndex({ tabIndex: _tabIndex }));
    setRefresh(true);
  };

  return (
    <>
      <AppBar
        title='ddd'
        postion='fixed'
        style={{
          background: "white",
        }}
      >
        <Toolbar>
          <IconButton edge='start' color='primary' aria-label='Menu'>
            <MenuIcon />
          </IconButton>

          <Tabs
            value={site.tabIndex}
            onChange={handleChange}
            aria-label='basic tabs example'
            variant='scrollable'
            style={{
              // backgroundColor: "red",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              minWidth: "700px",
              marginLeft: "30rem",
            }}
          >
            <Tab
              label='Home'
              style={{ color: site.tabIndex == 0 ? "black" : "" }}
            />
            <Tab
              label='Todo View'
              style={{ color: site.tabIndex == 1 ? "black" : "" }}
            />
            <Tab
              label='About Us'
              style={{ color: site.tabIndex == 2 ? "black" : "" }}
            />
            <Tab
              label='Our Services'
              style={{ color: site.tabIndex == 3 ? "black" : "" }}
            />
            <Tab
              label='Contact Us'
              style={{ color: site.tabIndex == 4 ? "black" : "" }}
            />
          </Tabs>

          <Grid container alignItems='center' justify='flex-end'>
            {user.loggedIn ? (
              <Grid item>
                <div style={{ display: "flex" }}>
                  <Typography
                    name='userEmail'
                    id='userEmail'
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0 2rem",
                      color: "#3f51b5",
                    }}
                  >
                    <PersonIcon style={{ marginRight: "0.5rem" }} />
                    {user.email}
                  </Typography>

                  <Button
                    onClick={() => dispatch(handleLogOut())}
                    variant='contained'
                    color='primary'
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Sign out
                  </Button>
                </div>
              </Grid>
            ) : (
              <Grid item>
                <div>
                  <Button
                    color='primary'
                    onClick={() => navigate("/signup")}
                    variant='contained'
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => navigate("/signin")}
                    variant='outlined'
                    style={{
                      margin: "0 0.5rem",
                    }}
                  >
                    Sign in
                  </Button>
                </div>
              </Grid>
            )}
          </Grid>
        </Toolbar>
        {/* {setRefresh(!refresh)} */}
      </AppBar>
    </>
  );
};

export default NavBar;
