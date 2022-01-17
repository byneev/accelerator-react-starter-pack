import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import CartLink from './cart-link';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({ ...getAppStateMock(), ...getUserStateMock(), });

describe('Test CartLink component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CartLink />
        </Router>
      </Provider>
    );
    history.replace(AppRoute.Main);
    expect(screen.getByText(/Перейти в корзину/)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(/cart-link/));

    expect(history.entries.length).toBeGreaterThan(1);
    expect(history.entries[1].pathname).toEqual(AppRoute.Cart);
  });
});
