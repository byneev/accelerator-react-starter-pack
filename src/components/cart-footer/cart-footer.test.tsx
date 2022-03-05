import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/reducers/root-reducer';
import { CouponType, LOCALE } from '../../utils/const';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import CartFooter from './cart-footer';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.App]: getAppStateMock(),
  [NameSpace.User]: getUserStateMock(),
});
const getTestingView = () => render(
  <Provider store={store}>
    <Router history={history}>
      <CartFooter />
    </Router>
  </Provider>
);

describe('Test CartFooter component', () => {
  it('Should render correctly', () => {
    getTestingView();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
  });
  it('Should show validate message on incorrect promocode input', () => {
    getTestingView();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: CouponType.Light, }, });
    fireEvent.submit(screen.getByTestId('form'));
    expect(screen.getByText(/Промокод принят/i)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'random-text', }, });
    fireEvent.submit(screen.getByTestId('form'));
    expect(screen.getByText(/Неверный промокод/i)).toBeInTheDocument();
  });
});
