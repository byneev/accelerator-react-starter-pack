import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getMockProduct } from '../../utils/mock';
import SortButton from './sort-button';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  guitars: [getMockProduct()],
});

describe('Test SortButton component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <SortButton isActive isPrice onClick={jest.fn}>По цене</SortButton>
        </Router>
      </Provider>
    );
    expect(screen.getByText(/По цене/)).toHaveClass(
      'catalog-sort__type-button--active'
    );
  });
});
