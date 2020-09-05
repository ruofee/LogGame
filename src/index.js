import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import * as serviceWorker from './serviceWorker';

// 引入百度统计代码
import './assets/js/tongji';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
