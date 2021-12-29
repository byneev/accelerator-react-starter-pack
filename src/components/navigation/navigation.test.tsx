import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getMockProduct } from '../../utils/mock';
import Navigation from './navigation';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  guitars: [getMockProduct()],
});

describe('Test Navigation component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Navigation />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Где купить/)).toBeInTheDocument();
  });
});