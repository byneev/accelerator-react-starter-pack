import { createAPI } from '../utils/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootProps } from './reducers/root-reducer';
import { Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../utils/const';
import { getMockProduct } from '../utils/mock';
import { setComments, setGuitars, setPriceRangeAcoustic, setPriceRangeAll, setPriceRangeElectric, setPriceRangeUkulele, setSearchedGuitars, setTotalCount } from './actions';
import { getCommentsFromServer, getProductsFromServer, getSearchedProducts } from './api-actions';
import { initialStateUser } from './reducers/user-reducer';

describe('Test async actions', () => {
  const cb404 = jest.fn();
  const cb401 = jest.fn();
  const cb400 = jest.fn();
  const cb503 = jest.fn();
  const api = createAPI(cb404, cb400, cb401, cb503);
  const mockAPI = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<RootProps, Action, ThunkDispatch<RootProps, AxiosInstance, Action>
  >(middleware);

  it('Should implement action setGuitars and setTotalCount', async () => {
    const guitars = [getMockProduct(), getMockProduct()];
    mockAPI.onGet(`${APIRoute.Guitars}?&_start=0&_limit=9`).reply(200, guitars, { 'x-total-count': 27, });
    const store = mockStore();
    await store.dispatch(getProductsFromServer('', initialStateUser.startRange));
    expect(store.getActions()).toEqual([setTotalCount(27), setGuitars(guitars)]);
  });
  it('Should implement action setSearchedGuitars', async () => {
    const guitars = [getMockProduct(), getMockProduct()];
    mockAPI.onGet(`${APIRoute.Guitars}?CURT`).reply(200, guitars);
    const store = mockStore();
    await store.dispatch(getSearchedProducts('CURT'));
    expect(store.getActions()).toEqual([setSearchedGuitars(guitars)]);
  });
  it('Should implement action setComments', async () => {
    const comments = ['hello', 'world'];
    mockAPI.onGet(`${APIRoute.Guitars}/${'2'}${APIRoute.Comments}`).reply(200, comments);
    const store = mockStore();
    await store.dispatch(getCommentsFromServer(2));
    expect(store.getActions()).toEqual([setComments(`2-${comments.length}`)]);
  });
  it('Should implement actions: setPriceRangeAcoustic, setPriceRangeElectric, setPriceRangeUkulele, setPriceRangeAll', async () => {
    const guitars = [getMockProduct(), getMockProduct()];
    mockAPI.onGet(`${APIRoute.Guitars}?_sort=price&_order=asc`).reply(200, guitars);
    mockAPI.onGet(`${APIRoute.Guitars}?type=acoustic&_sort=price&_order=asc`).reply(200, guitars);
    mockAPI.onGet(`${APIRoute.Guitars}?type=electric&_sort=price&_order=asc`).reply(200, guitars);
    mockAPI.onGet(`${APIRoute.Guitars}?type=ukulele&_sort=price&_order=asc`).reply(200, guitars);
    const store = mockStore();
    expect(store.getActions()).toEqual([
      setPriceRangeAll({ min: String(guitars[0].price), max: String(guitars.slice(-1)[0].price), }),
      setPriceRangeAcoustic({ min: String(guitars[0].price), max: String(guitars.slice(-1)[0].price), }),
      setPriceRangeElectric({ min: String(guitars[0].price), max: String(guitars.slice(-1)[0].price), }),
      setPriceRangeUkulele({ min: String(guitars[0].price), max: String(guitars.slice(-1)[0].price), })
    ]);
  });
});
