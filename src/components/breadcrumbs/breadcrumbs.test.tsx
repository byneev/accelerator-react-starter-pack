import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import Breadcrumbs from './breadcrumbs';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getMockProduct } from '../../utils/mock';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  guitars: [getMockProduct()],
});

describe('Test Breadcrumbs component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Breadcrumbs pathsTree={[AppRoute.Main, AppRoute.Catalog]} />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Каталог/)).toBeInTheDocument();
  });
});
