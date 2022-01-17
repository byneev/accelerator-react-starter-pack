import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import FormFilter from './form-filter';
import { rootReducer } from '../../store/reducers/root-reducer';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(rootReducer);

describe('Test FormFilter component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FormFilter />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Фильтр/)).toBeInTheDocument();
  });
});
