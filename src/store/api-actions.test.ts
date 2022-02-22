import { createAPI } from '../utils/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, RootProps } from './reducers/root-reducer';
import { Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../utils/const';
import { getAppStateMock, getMockPostReview, getMockProduct, getMockReview, getUserStateMock } from '../utils/mock';
import { setReviews, setGuitars, setPriceRangeAll, setSearchedGuitars, setShouldShowSpinner, setTotalCount, setIsModalReviewOpen, setIsModalReviewSuccessOpen, updateReviews, setCurrentProduct } from './actions';
import { getCommentsFromServer, getProductById, getProductsFromServer, getRangeByQuery, getSearchedProducts, sendReviewToServer } from './api-actions';
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
    expect(store.getActions()).toEqual([setGuitars(guitars), setTotalCount(27), setShouldShowSpinner(false)]);
  });
  it('Should implement action setSearchedGuitars', async () => {
    const guitars = [getMockProduct(), getMockProduct()];
    mockAPI.onGet(`${APIRoute.Guitars}?Ч`).reply(200, guitars);
    const store = mockStore();
    await store.dispatch(getSearchedProducts('Ч'));
    expect(store.getActions()).toEqual([setSearchedGuitars(guitars)]);
  });
  it('Should implement action setComments', async () => {
    const comments = [getMockReview(), getMockReview()];
    mockAPI.onGet(`${APIRoute.Guitars}/${'2'}${APIRoute.Comments}`).reply(200, comments);
    const store = mockStore();
    await store.dispatch(getCommentsFromServer(2));
    expect(store.getActions()).toEqual([setReviews(comments)]);
  });
  it('Should implement actions: setPriceRangeAll', async () => {
    const guitars = [getMockProduct(), { ...getMockProduct(), price: 22500, }];
    mockAPI.onGet(`${APIRoute.Guitars}?type=electric&`).reply(200, guitars);
    const store = mockStore({
      [NameSpace.App]: getAppStateMock(),
      [NameSpace.User]: getUserStateMock(),
    });
    await store.dispatch(getRangeByQuery('?type=electric&price_gte=5200&price_lte=12000&_sort=price&_order=asc'));
    expect(store.getActions()).toEqual([setPriceRangeAll({ min: String(guitars[0].price), max: String(guitars.slice(-1)[0].price), })]);
  });
  it('Should impement actions: setIsModalReviewsOpen, setIsModalReviewsSuccessOpen, updateReviews', async () => {
    const comment = getMockPostReview();
    mockAPI.onPost(`${APIRoute.Comments}`, comment).reply(200, getMockReview());
    const store = mockStore();
    await store.dispatch(sendReviewToServer(getMockPostReview()));
    expect(store.getActions()).toEqual([updateReviews(getMockReview()), setIsModalReviewOpen(false), setIsModalReviewSuccessOpen(true)]);
  });
  it('Should implement actions: setCurrentProduct', async () => {
    const guitar = getMockProduct();
    mockAPI.onGet(`${APIRoute.Guitars}/${guitar.id}`).reply(200, guitar);
    const store = mockStore();
    await store.dispatch(getProductById(guitar.id));
    expect(store.getActions()).toEqual([setCurrentProduct(guitar)]);
  });
});
