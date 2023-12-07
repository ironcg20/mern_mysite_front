// import { configureStore } from "@reduxjs/toolkit";
// import persistedReducer from "./persistConfig";
// import userReducer from "../reducers/userReducer"; // Import the userreducer

// export default configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// import { createStore } from "redux";
// import persistedReducer from "./persistConfig";

// const store = createStore(persistedReducer);
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./persistConfig"; // Import your persistedReducer

const store = configureStore({
  reducer: persistedReducer,
  // Optionally, you can configure middleware, devtools, and other settings here
});

export default store;
