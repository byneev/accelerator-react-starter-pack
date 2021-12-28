import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/reducer';
import FilterType from './filter-type';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(initialState);

describe('Test FilterType component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FilterType />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Акустические гитары/)).toBeInTheDocument();
    expect(screen.getByText(/Электрогитары/)).toBeInTheDocument();
    expect(screen.getByText(/Укулеле/)).toBeInTheDocument();
  });
});
