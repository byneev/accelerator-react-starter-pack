import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getMockProduct } from '../../utils/mock';
import OrderButton from './order-button';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  guitars: [getMockProduct()],
});

describe('Test OrderButton component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OrderButton isUp isActive onClick={jest.fn} />
        </Router>
      </Provider>
    );

    expect(screen.getByRole('button')).toHaveClass(
      'catalog-sort__order-button--up',
      'catalog-sort__order-button--active'
    );
  });
});
