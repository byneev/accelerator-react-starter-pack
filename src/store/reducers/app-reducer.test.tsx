import { FilterProps } from '../../types/filter-type';
import { SortType } from '../../utils/const';
import { getMockProduct } from '../../utils/mock';
import { setCurrentFilters, setCurrentSort, setGuitars } from '../actions';
import { appReducer, initialStateApp } from './app-reducer';


describe('Reducer test', () => {
  it('Should return Initial State', () => {
    expect(appReducer(void 0, { type: 'Unknown Action', })).toEqual(
      initialStateApp
    );
  });
  it('Should set payload to guitars field', () => {
    const guitars = [getMockProduct(), getMockProduct()];
    expect(appReducer(initialStateApp, setGuitars(guitars))).toEqual({
      ...initialStateApp,
      guitars: guitars,
    });
  });
  it('Should set payload to currentSort field', () => {
    expect(
      appReducer(
        initialStateApp,
        setCurrentSort([SortType.Popular, SortType.Descending])
      )
    ).toEqual({
      ...initialStateApp,
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
    expect(appReducer(initialStateApp, setCurrentFilters(filters))).toEqual({
      ...initialStateApp,
      currentFilters: filters,
    });
  });
});
