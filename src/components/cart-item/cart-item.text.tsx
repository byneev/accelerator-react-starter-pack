import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/reducers/root-reducer';
import { LOCALE } from '../../utils/const';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import CartItem from './cart-item';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.App]: getAppStateMock(),
  [NameSpace.User]: getUserStateMock(),
});

const getTestingView = () => render(
  <Provider store={store}>
    <Router history={history}>
      <CartItem product={getMockProduct()} count={2} key={getMockProduct().id} />
    </Router>
  </Provider>
);

describe('Testing CartItem component', () => {
  it('Should render correctly', () => {
    getTestingView();
    expect(screen.getByText(getMockProduct.name)).toBeInTheDocument();
  });
  it('Should decrement value by control buttons click', () => {
    getTestingView();
    userEvent.click(screen.getByTestId('minus'));
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });
  it('Should increment value by control buttons click', () => {
    getTestingView();
    userEvent.click(screen.getByTestId('plus'));
    expect(screen.getByRole('spinbutton')).toHaveValue(3);
  });
  it('Should set value with manual input', () => {
    getTestingView();
    fireEvent.input(screen.getByRole('spinbutton'), 10);
    expect(screen.getByRole('spinbutton')).toHaveValue(10);
  });
  it('Should correct calculate total price concrete item', () => {
    getTestingView();
    expect(screen.getByText((getMockProduct().price * 2).toLocaleString(LOCALE))).toBeInTheDocument();
  });
});
