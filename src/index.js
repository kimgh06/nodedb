import React from 'react';
// eslint-disable-next-line
import { hydrate, render } from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

const cont = document.getElementById('root');
const root = ReactDOM.createRoot(cont);

if (cont.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    cont,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

