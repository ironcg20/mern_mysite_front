// import React, { useState } from "react";
// import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
// import ShowTodoList from "./components/showTodoList";
// import CreateTodo from "./components/createTodo";
// import UpdateTodo from "./components/updateTodo";
// import App_ from "./components/App_";
// import "./App.scss";
// import NavBar from "./components/NavBar";
// import Home from "./components/Home";
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";

// const App = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   // const [data, setData] = useState({ email: "", password: "" });

//   const handleSignIn = async () => {
//     try {
//       const user = await SignIn("email", "password"); // Call the signIn function with actual credentials
//       handleLoginSuccess(user.email); // Assuming you have a function to handle successful login
//     } catch (error) {
//       console.error("Sign-in failed", error);
//       // Handle sign-in error (e.g., display error message)
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       const user = await SignUp("email", "password"); // Call the signUp function with actual credentials
//       handleLoginSuccess(user.email); // Assuming you have a function to handle successful login
//     } catch (error) {
//       console.error("Sign-up failed", error);
//       // Handle sign-up error (e.g., display error message)
//     }
//   };

//   const handleLoginSuccess = (email) => {
//     // Update state or perform actions upon successful login
//     console.log("Logged in as:", email);
//   };

//   return (
//     <div className='app-contents'>
//       <Router>
//         <NavBar />
//         <h1>{loggedIn}</h1>
//         <Switch>
//           <Route exact path='/' element={<Home />} />
//           <Route path='/user/:user' element={<ShowTodoList />} />
//           <Route path='/signup'>
//             <SignIn setLoggedIn={setLoggedIn} />
//           </Route>
//           <Route path='/signin' element={<SignIn />} />
//           <Route path='/create-todo/:user' element={<CreateTodo />} />
//           <Route path='/update-todo/:_id' element={<UpdateTodo />} />
//         </Switch>
//       </Router>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ShowTodoList from "./components/showTodoList";
import CreateTodo from "./components/createTodo";
import UpdateTodo from "./components/updateTodo";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NotFoundPage from "./components/NotFoundPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material"; // Optional: For resetting default styles
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  // CssBaseline,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e", // Change primary color
    },
    secondary: {
      main: "#d32f2f", // Change secondary color
    },
    // Other theme configurations like typography, spacing, etc.
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Change default font family
    // Other typography configurations
  },
  // Add more configurations as needed
});
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("No User");
  // const navigate = useNavigate();
  // Drawer ---------------------------
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Login & SignUp ---------------------

  const handleLoginSuccess = (email) => {
    // Update state or perform actions upon successful login
    console.log("Logged in as:", email);
    console.log("Loggin State: ", loggedIn);
    setLoggedIn(true); // Assuming successful login sets loggedIn to true
    setUserEmail(email);
  };

  const handleSignIn = (email) => {
    setLoggedIn(true);
    setUserEmail("");

    // try {
    //   const user = await SignIn("email", "password"); // Call the signIn function with actual credentials
    //   handleLoginSuccess(user.email); // Assuming you have a function to handle successful login
    // } catch (error) {
    //   console.error("Sign-in failed", error);
    //   // Handle sign-in error (e.g., display error message)
    // }
  };

  const handleSignOut = () => {
    //   // Handle sign out logic here
    setLoggedIn(false);
    setUserEmail("");
    // navigate("/");
  };

  const handleSignUp = async () => {
    // try {
    //   const user = await SignUp("email", "password"); // Call the signUp function with actual credentials
    //   handleLoginSuccess(user.email); // Assuming you have a function to handle successful login
    // } catch (error) {
    //   console.error("Sign-up failed", error);
    //   // Handle sign-up error (e.g., display error message)
    // }
  };

  // const handleSignIn = () => {
  //   setLoggedIn(true);
  //   setUserEmail("");
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Optional: For resetting default styles */}
      <div className='app-contents'>
        <Router>
          {
            <NavBar
              loggedIn={loggedIn}
              userEmail={userEmail}
              handleSignOut={handleSignOut}
            />
          }
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/user/:user' element={<ShowTodoList />} />
            <Route
              path='/signup'
              element={
                <SignUp
                  handleLoginSuccess={handleLoginSuccess}
                  // handleLoginSuccess_navbar={handleLoginSuccess}
                />
              }
            />
            <Route
              path='/signin'
              element={<SignIn handleLoginSuccess={handleLoginSuccess} />}
            />
            <Route path='/create-todo/:user' element={<CreateTodo />} />
            <Route path='/update-todo/:_id' element={<UpdateTodo />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
