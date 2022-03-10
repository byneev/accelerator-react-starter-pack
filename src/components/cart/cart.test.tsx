import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import Cart from './cart';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.App]: getAppStateMock(),
  [NameSpace.User]: { ...getUserStateMock(), cartGuitars: [[{ ...getMockProduct(), name: 'TestingName', }, 1]], },
});

const getTestingView = () => render(
  <Provider store={store}>
    <Router history={history}>
      <Cart />
    </Router>
  </Provider>
);

describe('Testing Cart component', () => {
  it('Should render correctly', () => {
    getTestingView();
    expect(screen.getByText(/TestingName/i)).toBeInTheDocument();
  });
  it('Should open modal when clicked remove button from cart button', () => {
    getTestingView();
    userEvent.click(screen.getByTestId('remove-from-cart'));
    setTimeout(() => expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument(), 500);
  });
});
