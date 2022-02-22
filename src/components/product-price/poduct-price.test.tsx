import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import ProductPrice from './product-price';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({ [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(), });

describe('Testing ProductPrice component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductPrice product={getMockProduct()} />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Цена:')).toBeInTheDocument();
  });
});
