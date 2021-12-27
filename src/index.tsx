/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createAPI } from './utils/api';
import { APIRoute } from './utils/const';

const api = createAPI(
  () => console.log('404'),
  () => console.log('400'),
  () => console.log('401'),
);

export const products = api.get(APIRoute.Guitars);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'));
