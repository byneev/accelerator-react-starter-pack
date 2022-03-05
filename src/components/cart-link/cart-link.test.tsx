import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import CartLink from './cart-link';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import { NameSpace } from '../../store/reducers/root-reducer';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(),
  [NameSpace.App]: getAppStateMock(),
});

const getTestingView = () => render(
  <Provider store={store}>
    <Router history={history}>
      <CartLink productsCount={2} />
    </Router>
  </Provider>
);

describe('Test CartLink component', () => {
  it('Should render correctly', () => {
    getTestingView();
    history.replace(AppRoute.Main);
    expect(screen.getByText(/Перейти в корзину/)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(/cart-link/));
    expect(history.entries.length).toBeGreaterThan(1);
    expect(history.entries[1].pathname).toEqual(AppRoute.Cart);
  });
  it('Should show total count of products in cart', () => {
    getTestingView();
    expect(screen.getByText(/2/)).toBeInTheDocument();
  });
});
