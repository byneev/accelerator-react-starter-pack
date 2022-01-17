import { FilterProps } from '../../types/filter-type';
import { SortType } from '../../utils/const';
import { getMockProduct } from '../../utils/mock';
import { setCurrentFilters, setCurrentSort, setGuitars } from '../actions';
import { userReducer, initialStateUser } from './user-reducer';


describe('Reducer test', () => {
  it('Should return Initial State', () => {
    expect(userReducer(void 0, { type: 'Unknown Action', })).toEqual(
      initialStateUser
    );
  });
  it('Should set payload to guitars field', () => {
    const guitars = [getMockProduct(), getMockProduct()];
    expect(userReducer(initialStateUser, setGuitars(guitars))).toEqual({
      ...initialStateUser,
      guitars: guitars,
    });
  });
  it('Should set payload to currentSort field', () => {
    expect(
      userReducer(
        initialStateUser,
        setCurrentSort([SortType.Popular, SortType.Descending])
      )
    ).toEqual({
      ...initialStateUser,
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
    expect(userReducer(initialStateUser, setCurrentFilters(filters))).toEqual({
      ...initialStateUser,
      currentFilters: filters,
    });
  });
});
