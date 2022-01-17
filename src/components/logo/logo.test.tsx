import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Logo from './logo';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({ ...getAppStateMock(), ...getUserStateMock(), });

describe('Test FooterNavItem component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Logo />
        </Router>
      </Provider>
    );

    expect(screen.getByAltText(/Логотип/)).toBeInTheDocument();
  });
});
