import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import ProductDetailWrapper from './product-detail-wrapper';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(),
});

describe('Testing ProductDetailWrapper component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductDetailWrapper />
        </Router>
      </Provider>
    );
    expect(screen.getByText(getMockProduct().vendorCode)).toBeInTheDocument();
  });
});
