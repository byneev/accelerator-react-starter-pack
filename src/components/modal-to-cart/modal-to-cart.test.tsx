import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/reducers/root-reducer';
import { AppRoute } from '../../utils/const';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import ModalToCart from './modal-to-cart';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.App]: getAppStateMock(),
  [NameSpace.User]: getUserStateMock(),
});
const storeWithoutCartGuitars = mockStore({
  [NameSpace.App]: getAppStateMock(),
  [NameSpace.User]: {
    ...getUserStateMock(), cartGuitars: [],
  },
});

const getTestingView = (container: AppRoute, storeToView: MockStore<any, AnyAction>) => render(
  <Provider store={storeToView}>
    <Router history={history}>
      <ModalToCart container={container} product={getMockProduct()} />
    </Router>
  </Provider>
);

describe('Testing ModalToCart component', () => {
  it('Should render correctly in Catalog when product already in cart', () => {
    getTestingView(AppRoute.Catalog, store);
    expect(screen.getByText(/Удалить товар/i)).toBeInTheDocument();
  });
  it('Should render correctly in Catalog when product not in cart', () => {
    getTestingView(AppRoute.Catalog, storeWithoutCartGuitars);
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
  it('Should render correctly in Guitars when product already in cart', () => {
    getTestingView(AppRoute.Guitars, store);
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
  it('Should render correctly in Guitars when product not in cart', () => {
    getTestingView(AppRoute.Guitars, storeWithoutCartGuitars);
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
  it('Should render correctly in Cart when product already in cart', () => {
    getTestingView(AppRoute.Cart, store);
    expect(screen.getByText(/Удалить товар/i)).toBeInTheDocument();
  });
});
