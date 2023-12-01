import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import SignUp from "./SignUp";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const style = {
  flexGrow: 1,
};
const NavBar = ({ handleSignIn, handleSignUp }) => {
  // const [user, setUser] = useState("");

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' style={style}>
            Mern Stack Todo List
          </Typography>
          {/* <Route path='/signup'  /> */}

          <p name='userName' id='userName'></p>
          <Link to={`/signin/`}>
            <Button onClick={handleSignIn}>Sign in</Button>
          </Link>
          <Link to={`/signup/`}>
            <Button onClick={handleSignUp}>Sign Up</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
