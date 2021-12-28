import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/reducer';
import FilterStrings from './filter-strings';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(initialState);

describe('Test FilterStrings component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FilterStrings />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Количество струн/)).toBeInTheDocument();
  });
});
