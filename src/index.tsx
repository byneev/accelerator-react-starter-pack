/* eslint-disable no-console */
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { RootReducer } from './store/reducer';
import { createAPI } from './utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(
  () => toast.warn('Page not found. Input correct url.'),
  () => toast.warn('Bad request. Pass correct request.'),
  () => toast.warn('You are unauthorized. Please, login to cite'),
  () => toast.warn('Service unavalaible. Try again later.')
);

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
