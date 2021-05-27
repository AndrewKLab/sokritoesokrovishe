import * as React from 'react';
import { Router } from './Router';
import { Provider } from 'react-redux';
import { store } from './_helpers';


function App(props) {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
