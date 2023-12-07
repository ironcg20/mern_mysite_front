import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./persistConfig"; // Import your persistedReducer

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
