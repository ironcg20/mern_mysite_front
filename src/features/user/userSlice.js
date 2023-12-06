import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state and reducers using createSlice
const userSlice = createSlice({
  name: "user",
  initialState: {
    value: 0,
    loggedIn: false,
    _id: "423521",
    email: "example@example.com",
    password: "123456",
    message: "No message",
  },

  reducers: {
    logIn: (state, action) => {
      state.loggedIn = true;
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.message = "Logged in successfully!";
      // +"Email - "+state.email+"; Password - "+state.password;
    },

    logOut: (state) => {
      state.loggedIn = false;
      state._id = "";
      state.email = "";
      state.password = "";
      state.message = "Logged Out!";
    },

    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

// Extract the actions and reducer from the slice
export const { logIn, logOut, setMessage } = userSlice.actions;

export const handleLogIn = (_data) => async (dispatch) => {
  axios
    .post("http://localhost:8000/api/user", _data) // Adjust the API endpoint for sign-in
    .then((res) => {
      const { id, message } = res.data;
      if (id) {
        dispatch(
          logIn({
            _id: id,
            email: _data.email,
            password: _data.password,
          }),
        );
        return true;
        console.log("[Received Data]\n" + "ID: " + id);
        console.log("Sign-in success!");
      } else {
        dispatch(setMessage(message));
        console.log("Sign-in failed!");
        return false;
      }
    })
    .catch((err) => {
      dispatch(setMessage(err.message));
      console.log("User is not exist!");
      console.log(err.message);
      return false;
    });
};

export const handleSignUp = (_data) => async (dispatch) => {
  axios
    .post("http://localhost:8000/api/user/create", _data)
    .then((res) => {
      dispatch(setMessage(res.data.message));
      dispatch(handleLogIn({ email: _data.email, password: _data.password }));
      return true;
    })
    .catch((err) => {
      dispatch(setMessage(err.message));
      return false;
    });
};

export const handleLogOut = () => async (dispatch) => {
  dispatch(logOut());
  return true;
};

export default userSlice.reducer;
