import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { CurrentTab } from '../../utils/const';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import TabsDescription from './tabs-description';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(),
});

describe('Testing TabsDescription component', () => {
  it('Should render correctly', () => {
    const product = getMockProduct();
    render(
      <Provider store={store}>
        <Router history={history}>
          <TabsDescription currentTab={CurrentTab.Characteristics} product={product} />
        </Router>
      </Provider>
    );
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });
});
