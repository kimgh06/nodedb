import React from 'react';
// eslint-disable-next-line
import { hydrate, render } from 'react-dom';
import App from './App';

const cont = document.getElementById('root');

if (cont.hasChildNodes()) {
  hydrate(
    <React.StrictMode>
      <App />
    </React.StrictMode>, cont
  );
}
else {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>, cont
  );
}

