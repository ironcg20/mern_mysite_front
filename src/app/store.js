import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'; // Import the reducer
import userReducer from '../features/user/userSlice'; // Import the reducer

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
});