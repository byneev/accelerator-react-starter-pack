import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getMockProduct } from '../../utils/mock';
import ProductCard from './product-card';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../utils/const';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  guitars: [getMockProduct()],
});

describe('Test ProductCard component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductCard
            product={{
              id: 14,
              name: 'Example',
              vendorCode: '',
              type: '',
              description: '',
              previewImg: '',
              stringCount: 0,
              rating: 0,
              price: 0,
            }}
          />
        </Router>
      </Provider>
    );
    history.replace(AppRoute.Cart);
    expect(screen.getByText(/Example/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Подробнее/));
    expect(history.entries[1].pathname).toEqual(`${AppRoute.Guitars}/14`);
  });
});
