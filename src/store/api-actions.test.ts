import { createAPI } from '../utils/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootProps } from './reducer';
import { Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../utils/const';
import { getMockProduct } from '../utils/mock';
import { setGuitars } from './actions';
import { getProductsFromServer } from './api-actions';

describe('Test async actions', () => {
  const cb404 = jest.fn();
  const cb401 = jest.fn();
  const cb400 = jest.fn();
  const api = createAPI(cb404, cb400, cb401);
  const mockAPI = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api),];
  const mockStore = configureMockStore<RootProps, Action, ThunkDispatch<RootProps, AxiosInstance, Action>
  >(middleware);

  it('Should implement action setGuitars', async () => {
    const guitars = [getMockProduct(), getMockProduct(),];
    mockAPI.onGet(APIRoute.Guitars).reply(200, guitars);
    const store = mockStore();
    await store.dispatch(getProductsFromServer());
    expect(store.getActions()).toEqual([setGuitars(guitars),]);
  });
});
