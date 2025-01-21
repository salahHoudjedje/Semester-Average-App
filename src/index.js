import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you're using `react-dom/client`
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use `ReactDOM.createRoot`
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();