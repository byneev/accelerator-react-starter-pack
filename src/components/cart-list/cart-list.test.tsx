import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import CartList from './cart-list';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.App]: getAppStateMock(),
  [NameSpace.User]: getUserStateMock(),
});

const getTestingView = () => render(
  <Provider store={store}>
    <Router history={history}>
      <CartList products={[[getMockProduct(), 2], [{ ...getMockProduct(), id: 999, }, 3]]} />
    </Router>
  </Provider>
);

describe('Testing CartList component', () => {
  it('Should render correct amount of products', () => {
    getTestingView();
    expect(screen.getAllByText(new RegExp(getMockProduct().vendorCode, 'i'))).toHaveLength(2);
  });
});
