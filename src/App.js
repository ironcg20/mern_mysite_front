import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store'; // Import the store
import CounterComponent from './features/counter/CounterComponent';
import UserComponent from './features/user/UserComponent';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UserComponent /> {/* Render the CounterComponent */}
      </div>
    </Provider>
  );
};

export default App;