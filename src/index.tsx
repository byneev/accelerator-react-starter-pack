/* eslint-disable no-console */
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { getProductsFromServer } from './store/api-actions';
import { RootReducer } from './store/reducer';
import { createAPI } from './utils/api';

const api = createAPI(
  () => console.log('404'),
  () => console.log('400'),
  () => console.log('401')
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

store.dispatch(getProductsFromServer());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
