import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import ProductCard from './product-card';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../utils/const';
import { NameSpace } from '../../store/reducers/root-reducer';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(),
  [NameSpace.App]: getAppStateMock(),
});

describe('Test ProductCard component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductCard
            product={getMockProduct()}
            isInCart={false}
          />
        </Router>
      </Provider>
    );
    history.replace(AppRoute.Cart);
    expect(screen.getByText(/Example/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Подробнее/));
    expect(history.entries[1].pathname).toEqual(`${AppRoute.Guitars}/14`);
  });
});
