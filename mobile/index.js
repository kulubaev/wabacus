import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/App';

import configureStore from './src/store';

const store = configureStore();

const app = () => (
  <Provider store={store}>
    <App/> 
  </Provider>
);

AppRegistry.registerComponent('wabacus', () => app);

