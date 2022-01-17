import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import NavigationItem from './navigation-item';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({ ...getAppStateMock(), ...getUserStateMock(), });

describe('Test NavigationItem component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NavigationItem route={AppRoute.Main}>Где купить</NavigationItem>
        </Router>
      </Provider>
    );
    history.replace(AppRoute.Cart);
    expect(screen.getByText(/Где купить/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Где купить/));
    expect(history.entries[1].pathname).toEqual(AppRoute.Main);
  });
});
