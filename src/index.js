import React from 'react';
// eslint-disable-next-line
import { hydrate, render } from 'react-dom';
import { ReactDOM } from 'react';
import App from './App';

const cont = document.getElementById('root');
const root = ReactDOM.createRoot(cont);

if (cont.hasChildNodes()) {
  hydrate(
    <React.StrictMode>
      <App />
    </React.StrictMode>, cont
  );
}
else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>, cont
  );
}

