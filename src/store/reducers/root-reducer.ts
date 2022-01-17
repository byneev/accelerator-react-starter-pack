import { combineReducers } from '@reduxjs/toolkit';

import { appReducer } from './app-reducer';
import { userReducer } from './user-reducer';

export enum NameSpace {
  User = 'user',
  App = 'app',
}

export const rootReducer = combineReducers({
  [NameSpace.User]: userReducer,
  [NameSpace.App]: appReducer,
});


export type RootProps = ReturnType<typeof rootReducer>;
