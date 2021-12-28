import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/reducer';
import Main from './main';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(initialState);

describe('Test Main component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    );
    setTimeout(() => {
      expect(
        screen.getByText(
          /Магазин гитар, музыкальных инструментов и гитарная мастерская/
        )
      ).toBeInTheDocument();
    }, 1000);
  });
});
