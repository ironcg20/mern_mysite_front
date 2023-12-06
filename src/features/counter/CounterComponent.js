import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice'; // Import actions from slice

const CounterComponent = () => {
  const counter = useSelector((state) => state.counter.value); // Accessing the state from 'counter'
  const dispatch = useDispatch(); // Getting dispatch function

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default CounterComponent;