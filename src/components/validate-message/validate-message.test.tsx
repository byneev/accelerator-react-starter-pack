import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import ValidateMessage from '../validate-message/validate-message';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.App]: getAppStateMock(),
  [NameSpace.User]: getUserStateMock(),
});

const getTestingView = (code: number) => render(
  <Provider store={store}>
    <Router history={history}>
      <ValidateMessage validateCode={code} />
    </Router>
  </Provider>
);

describe('Testing ValidateMessage component', () => {
  it('Should render correctly with code 1', () => {
    getTestingView(1);
    expect(screen.getByText(/Промокод принят/i)).toBeInTheDocument();
  });
  it('Should render correcetly with code 2', () => {
    getTestingView(2);
    expect(screen.getByText(/Неверный промокод/i)).toBeInTheDocument();
  });
  it('Should not render with code 0', () => {
    getTestingView(0);
    expect(screen.queryByText(/Промокод принят/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Неверный промокод/i)).not.toBeInTheDocument();
  });
});
