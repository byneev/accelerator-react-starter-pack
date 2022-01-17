import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import ProductsList from './products-list';
import { NameSpace } from '../../store/reducers/root-reducer';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(),
  [NameSpace.App]: getAppStateMock(),
});

describe('Test ProductList component', () => {
  it('Should return initialState', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductsList />
        </Router>
      </Provider>
    );
    expect(screen.getAllByText(/₽/).length).toEqual(1);
  });
});
