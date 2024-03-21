import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'src/colors/variables.scss';
import 'src/index.scss';
import 'src/App.scss';
import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
