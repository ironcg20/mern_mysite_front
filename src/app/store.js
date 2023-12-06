import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'; // Import the counterreducer
import userReducer from '../features/user/userSlice'; // Import the userreducer

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});