import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { CurrentTab } from '../../utils/const';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import thunk from 'redux-thunk';
import TabsControlsItem from './tabs-controls-item';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(),
});

describe('Testing TabsControlsItem component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <TabsControlsItem currentTab={CurrentTab.Description}>Описание</TabsControlsItem>
        </Router>
      </Provider >
    );
    expect(screen.getByText('Описание')).toBeInTheDocument();
  });
});
