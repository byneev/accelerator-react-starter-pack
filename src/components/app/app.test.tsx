import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { AppRoute, BASIC_DELAY } from '../../utils/const';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import Catalog from '../catalog/catalog';
import Main from '../main/main';
import NotFound from '../not-found/not-found';
import thunk from 'redux-thunk';

const history = createMemoryHistory();
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(), });

describe('Test component App', () => {
  it('Test correct routing', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Main} exact>
              <Main />
            </Route>
            <Route path={`${AppRoute.Catalog}/:page`} exact>
              <Catalog />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
    history.push(AppRoute.Main);
    expect(screen.getAllByText('Главная')).toHaveLength(2);
    history.push(`${AppRoute.Catalog}/1`);
    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    history.push(`${AppRoute.Catalog}/1?type=acoustic`);
    setTimeout(() => {
      expect(screen.getByTestId('acoustic')).toBeChecked();
    }, BASIC_DELAY);
  });
});
