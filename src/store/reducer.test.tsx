import { FilterProps } from '../types/filter-type';
import { SortType } from '../utils/const';
import { getMockProduct } from '../utils/mock';
import { setCurrentFilters, setCurrentSort, setGuitars } from './actions';
import { initialState, RootReducer } from './reducer';

describe('Reducer test', () => {
  it('Should return Initial State', () => {
    expect(RootReducer(void 0, { type: 'Unknown Action', })).toEqual(
      initialState
    );
  });
  it('Should set payload to guitars field', () => {
    const guitars = [getMockProduct(), getMockProduct()];
    expect(RootReducer(initialState, setGuitars(guitars))).toEqual({
      ...initialState,
      guitars: guitars,
    });
  });
  it('Should set payload to currentSort field', () => {
    expect(
      RootReducer(
        initialState,
        setCurrentSort([SortType.Popular, SortType.Descending])
      )
    ).toEqual({
      ...initialState,
      currentSort: [SortType.Popular, SortType.Descending],
    });
  });
  it('Should set payload to currentFilters field', () => {
    const filters: FilterProps = {
      priceMin: '1000',
      priceMax: '20000',
      guitarType: {
        isAcustic: true,
        isElectro: true,
        isUkulele: true,
      },
      stringsCount: {
        isFour: true,
        isSix: true,
        isSeven: true,
        isTwelve: true,
      },
    };
    expect(RootReducer(initialState, setCurrentFilters(filters))).toEqual({
      ...initialState,
      currentFilters: filters,
    });
  });
});
