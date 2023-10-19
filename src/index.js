import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App';
import reportWebVitals from './reportWebVitals';
import CryptoContext from './CryptoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>
);
reportWebVitals();
