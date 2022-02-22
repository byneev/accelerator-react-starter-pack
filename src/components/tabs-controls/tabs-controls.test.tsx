import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { CurrentTab } from '../../utils/const';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import TabsControls from './tabs-controls';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(),
});

describe('Testing TabsControls component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <TabsControls currentTab={CurrentTab.Description} />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByTestId('Характеристики')).toHaveClass('button--black-border');
  });
});
