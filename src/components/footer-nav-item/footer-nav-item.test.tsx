import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import FooterNavItem from './footer-nav-item';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../utils/const';
import { rootReducer } from '../../store/reducers/root-reducer';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(rootReducer);

describe('Test FooterNavItem component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FooterNavItem>Вопрос-ответ</FooterNavItem>
        </Router>
      </Provider>
    );
    history.replace(AppRoute.Cart);
    expect(screen.getByText(/Вопрос-ответ/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Вопрос-ответ/));
    expect(history.entries[1].pathname).toEqual(AppRoute.Main);
  });
});
