import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import ProductRateStar from './product-rate-star';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({ ...getAppStateMock(), ...getUserStateMock(), });

describe('Test ProductRateStar component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductRateStar isFull />
        </Router>
      </Provider>
    );
    expect(screen.getByTestId('full')).toBeInTheDocument();
  });
});
