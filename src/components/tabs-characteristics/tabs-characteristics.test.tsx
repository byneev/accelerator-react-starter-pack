import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { CurrentTab } from '../../utils/const';
import { getAppStateMock, getMockProduct, getUserStateMock } from '../../utils/mock';
import TabsCharacteristics from './tabs-characteristics';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(),
});

describe('Testing TabsCharacteristics component', () => {
  it('Should render correctly', () => {
    const product = getMockProduct();
    render(
      <Provider store={store}>
        <Router history={history}>
          <TabsCharacteristics currentTab={CurrentTab.Characteristics} product={product} />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Количество струн:')).toBeInTheDocument();
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
  });
});
