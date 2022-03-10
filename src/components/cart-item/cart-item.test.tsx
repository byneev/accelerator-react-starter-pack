import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/reducers/root-reducer';
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
  it('Should decrement value by control buttons click', () => {
    getTestingView();
    userEvent.click(screen.getByTestId('minus'));
    expect(screen.getByTestId('quantity')).toHaveValue(1);
  });
  it('Should increment value by control buttons click', () => {
    getTestingView();
    userEvent.click(screen.getByTestId('plus'));
    expect(screen.getByTestId('quantity')).toHaveValue(3);
  });
  it('Should set value with manual input', () => {
    getTestingView();
    fireEvent.change(screen.getByTestId('quantity'), 10);
    setTimeout(() => expect(screen.getByTestId('quantity')).toHaveValue(10), 500);
  });
  it('Should show correct vendor code', () => {
    getTestingView();
    expect(screen.getByText(/SO757575/i)).toBeInTheDocument();
  });
});
