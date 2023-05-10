import React from 'react';
import { hydrate } from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

const cont = document.getElementById('root');
const dom = ReactDOM.createRoot(cont);

if (cont.hasChildNodes()) {
  hydrate(
    <App />
    , cont
  );
}
else {
  dom.render(
    <App />
    , cont
  );
}

