import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import ProductCard from './product-card';
import { NameSpace } from '../../store/reducers/root-reducer';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(),
  [NameSpace.App]: getAppStateMock(),
});

const getTestingView = (isInCart: boolean) => render(
  <Provider store={store}>
    <Router history={history}>
      <ProductCard
        product={getMockProduct()}
        isInCart={isInCart}
      />
    </Router>
  </Provider>
);

describe('Test ProductCard component', () => {
  it('Should render correctly with when already in cart', () => {
    getTestingView(true);
    expect(screen.getByText(/В корзине/i)).toBeInTheDocument();
  });
  it('Should render correctly with when not in cart', () => {
    getTestingView(false);
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });
});
