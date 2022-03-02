import { combineReducers } from '@reduxjs/toolkit';

import { appReducer } from './app-reducer';
import { cartReducer } from './cart-reducer';
import { userReducer } from './user-reducer';

export enum NameSpace {
  User = 'user',
  App = 'app',
  Cart = 'cart',
}

export const rootReducer = combineReducers({
  [NameSpace.User]: userReducer,
  [NameSpace.App]: appReducer,
  [NameSpace.Cart]: cartReducer.reducer,
});


export type RootProps = ReturnType<typeof rootReducer>;
