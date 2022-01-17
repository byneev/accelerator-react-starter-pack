import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import { NameSpace } from '../../store/reducers/root-reducer';
import { ChangeEvent } from 'react';
import FilterPrice from './filter-price';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(),
  [NameSpace.App]: getAppStateMock(),
});

describe('Test filterStrings component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FilterPrice onChangePriceMin={function (evt: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }} onChangePriceMax={function (evt: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }} onBlurPriceMin={function (): void {
            throw new Error('Function not implemented.');
          }} onBlurPriceMax={function (): void {
            throw new Error('Function not implemented.');
          }} priceMin={'1111'} priceMax={'2222'} actualPriceRange={{
            min: '',
            max: '',
          }}
          />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Минимальная цена/)).toBeInTheDocument();
    expect(screen.getByText(/Максимальная цена/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1111/)).toBeInTheDocument();
  });
});
