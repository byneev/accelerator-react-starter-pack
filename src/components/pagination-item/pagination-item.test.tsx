import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getMockProduct } from '../../utils/mock';
import userEvent from '@testing-library/user-event';
import PaginationItem from './pagination-item';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  guitars: [getMockProduct()],
});

describe('Test PaginationItem component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PaginationItem isActive={false} pageLink={'3'} />
        </Router>
      </Provider>
    );
    history.replace(AppRoute.Main);
    expect(screen.getByText(/3/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/3/));
    expect(history.entries[1].pathname).toEqual(
      `${AppRoute.Catalog}/${AppRoute.Page}/3`
    );
  });
});
