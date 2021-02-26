import React from 'react';
import ReactDOM from 'react-dom';
import App from './_layouts/app.layout';
import { store } from './_helpers';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
