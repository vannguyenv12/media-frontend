import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'src/colors/variables.scss';
import 'src/index.scss';
import 'src/App.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
