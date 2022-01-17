import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getMockProduct } from '../../utils/mock';
import ProductRate from './product-rate';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  guitars: [getMockProduct()],
});

describe('Test ProductRate component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductRate rating={4} ratingsCount={'100'} />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getAllByTestId('full').length).toEqual(4);
  });
});
