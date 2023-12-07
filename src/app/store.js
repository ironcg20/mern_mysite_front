import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./persistConfig";
import counterReducer from "../reducers/counterSlice"; // Import the counterreducer
import userReducer from "../reducers/userSlice"; // Import the userreducer

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

// import { createStore } from "redux";
// import persistedReducer from "./persistConfig";

// const store = createStore(persistedReducer);
// export default store;
