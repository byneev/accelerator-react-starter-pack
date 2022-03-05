import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/reducers/root-reducer';
import { AppRoute } from '../../utils/const';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import ModalCartSuccess from './modal-cart-success';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.App]: getAppStateMock(),
  [NameSpace.User]: getUserStateMock(),
});

const getTestingView = (container: AppRoute) => render(
  <Provider store={store}>
    <Router history={history}>
      <ModalCartSuccess container={container} product={getMockProduct()} />
    </Router>
  </Provider>
);

describe('Testing ModalCartSuccess component', () => {
  it('Should render correctly in Cart', () => {
    getTestingView(AppRoute.Cart);
    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });
});
