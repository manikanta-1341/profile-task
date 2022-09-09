import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './App';
import {Provider} from 'react-redux'
import {Store} from './redux/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={Store}>
    <Routing />
  </Provider>
  // </React.StrictMode>
);

