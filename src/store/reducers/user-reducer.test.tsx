import { FilterProps } from '../../types/filter-type';
import { BAD_QUERY, SortType } from '../../utils/const';
import { setCurrentFilters, setCurrentPage, setCurrentQuery, setCurrentSort, setSearchQuery, setStartRange, setTotalCount } from '../actions';
import { userReducer, initialStateUser } from './user-reducer';


describe('Reducer test', () => {
  it('Should return Initial State', () => {
    expect(userReducer(void 0, { type: 'Unknown Action', })).toEqual(
      initialStateUser
    );
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
  it('Should set payload to searchQuery', () => {
    expect(userReducer(initialStateUser, setSearchQuery('CURT'))).toEqual({ ...initialStateUser, searchQuery: 'CURT', });
  });
  it('Should set payload to startRange', () => {
    expect(userReducer(initialStateUser, setStartRange(9))).toEqual({ ...initialStateUser, startRange: 9, });
  });
  it('Should set payload to totalCount', () => {
    expect(userReducer(initialStateUser, setTotalCount(27))).toEqual({ ...initialStateUser, totalCount: 27, });
  });
  it('Should set payload to currentPage', () => {
    expect(userReducer(initialStateUser, setCurrentPage('2'))).toEqual({ ...initialStateUser, currentPage: '2', });
  });
  it('Should set payload to currentQuery', () => {
    expect(userReducer(initialStateUser, setCurrentQuery(BAD_QUERY))).toEqual({ ...initialStateUser, currentQuery: BAD_QUERY, });
  });
});
