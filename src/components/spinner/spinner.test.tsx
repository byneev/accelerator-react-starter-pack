import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import Catalog from '../catalog/catalog';
import thunk from 'redux-thunk';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [NameSpace.App]: { ...getAppStateMock(), shouldShowSpinner: true, },
  [NameSpace.User]: getUserStateMock(),
});

describe('Test Spinner Component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store} >
        <Router history={history} >
          <Catalog />
        </Router>
      </Provider>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
