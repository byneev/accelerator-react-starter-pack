import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import NotFound from './not-found';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({ [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(), });

describe('Test component NotFound', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFound />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
