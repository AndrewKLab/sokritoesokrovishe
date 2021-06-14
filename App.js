import * as React from 'react';
import { Router } from './Router';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import Purchases from 'react-native-purchases';
import { configConstants } from './_constants';



function App(props) {
  React.useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.setup(configConstants.API_KEY);
  }, [])
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
