import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import BreadcrumbsItem from './breadcrumbs-item';
import userEvent from '@testing-library/user-event';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import { NameSpace } from '../../store/reducers/root-reducer';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(),
  [NameSpace.App]: getAppStateMock(),
});

describe('Test Breadcrumbs component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <BreadcrumbsItem route={AppRoute.Main} isCurrent={false}>
            Главная
          </BreadcrumbsItem>
        </Router>
      </Provider>
    );
    history.replace(AppRoute.Cart);
    expect(screen.getByText(/Главная/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Главная/));

    expect(history.entries.length).toBeGreaterThan(1);
    expect(history.entries[1].pathname).toEqual(AppRoute.Main);
  });
});
