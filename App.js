import * as React from 'react';
import { Router } from './Router';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import { Platform } from "react-native";

function App(props) {
  console.log(Platform.OS === 'ios' ? 'Arial' : 'sans-serif')
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
