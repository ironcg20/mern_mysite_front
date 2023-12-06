import { createSlice } from '@reduxjs/toolkit';

// Define the initial state and reducers using createSlice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0,
    loggedIn: false,
    id: "423521",
    email: "example@example.com",
    password: "123456",
    message: "No message",
  },
  
  reducers: {
    logIn: (state, action) => {
        state.loggedIn=true;
        state.email=action.payload.email;
        state.password=action.payload.password;
        state.message="Logged in successfully!";
        // +"Email - "+state.email+"; Password - "+state.password;
    },

    logOut: (state) => {
        state.loggedIn=false;
        state.id="";
        state.email="";
        state.password="";
        state.message="Logged Out!";
    },

    setMessage : (state, action) => {
        state.message=action.payload;
    },

    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Extract the actions and reducer from the slice
export const { logIn, logOut, setMessage, increment, decrement } = userSlice.actions;
export default userSlice.reducer;