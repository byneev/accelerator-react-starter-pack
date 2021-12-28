import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getMockProduct } from '../../utils/mock';
import SearchSelectItem from './search-select-item';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  guitars: [getMockProduct()],
});

describe('Test ProductList component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <SearchSelectItem>Ozzy</SearchSelectItem>
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Ozzy/)).toBeInTheDocument();
  });
});
