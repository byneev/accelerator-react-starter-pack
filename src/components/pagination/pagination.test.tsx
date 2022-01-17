import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import { NameSpace } from '../../store/reducers/root-reducer';
import thunk from 'redux-thunk';
import { createAPI } from '../../utils/api';
import Pagination from './pagination';

const history = createMemoryHistory();
const cb404 = jest.fn();
const cb401 = jest.fn();
const cb400 = jest.fn();
const cb503 = jest.fn();
const api = createAPI(cb404, cb400, cb401, cb503);
const middleware = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  [NameSpace.User]: { ...getUserStateMock(), totalCount: 46, currentPage: 3, },
  [NameSpace.App]: getAppStateMock(),
});

describe('Test PaginationItem component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Назад/)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
    expect(screen.getByText(/Вперед/)).toBeInTheDocument();
  });
});
