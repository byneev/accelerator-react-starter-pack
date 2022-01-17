import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Sort from './sort';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({ ...getAppStateMock(), ...getUserStateMock(), });


describe('Test Sort component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Sort />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/По популярности/i)).toBeInTheDocument();
  });
});
