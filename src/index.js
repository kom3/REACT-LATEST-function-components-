import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Routercomponent from './App.jsx';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/js/bootstrap.bundle.js"

ReactDOM.render(
  <React.StrictMode>
    <Routercomponent />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
