import { createSlice } from '@reduxjs/toolkit';

// Define the initial state and reducers using createSlice
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Extract the actions and reducer from the slice
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;