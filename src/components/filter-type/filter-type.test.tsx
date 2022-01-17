import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import { NameSpace } from '../../store/reducers/root-reducer';
import FilterType from './filter-type';
import { ChangeEvent } from 'react';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(),
  [NameSpace.App]: getAppStateMock(),
});

describe('Test filterType component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FilterType guitarType={{
            isAcustic: false,
            isElectro: false,
            isUkulele: false,
          }} onChangeGuitarType={function (evt: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          }}
          />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Акустические гитары/)).toBeInTheDocument();
    expect(screen.getByText(/Электрогитары/)).toBeInTheDocument();
    expect(screen.getByText(/Укулеле/)).toBeInTheDocument();
  });
});
