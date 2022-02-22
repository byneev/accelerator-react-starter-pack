import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import Tabs from './tabs';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(),
});

describe('Testing Tabs component', () => {
  it('Should render correctly', () => {
    const product = getMockProduct();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Tabs product={product} />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('Описание'));
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });
});
