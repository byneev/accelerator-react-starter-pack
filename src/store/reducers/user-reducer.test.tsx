import { FilterProps } from '../../types/filter-type';
import { ProductProps } from '../../types/product-type';
import { BAD_QUERY, SortType } from '../../utils/const';
import { getMockProduct } from '../../utils/mock';
import { addToCartGuitars, removeFromCartGuitars, removeFullCountGuitarFromCart, setCartProduct, setCurrentFilters, setCurrentPage, setCurrentQuery, setCurrentSale, setCurrentSort, setGuitarsCount, setSearchInput, setSearchQuery, setStartRange, setTotalCount } from '../actions';
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
  it('Should set payload to search input', () => {
    expect(userReducer(initialStateUser, setSearchInput('Curt'))).toEqual({ ...initialStateUser, searchInput: 'Curt', });
  });
  it('Should add new card guitar item to card guitars', () => {
    const cartGuitar = getMockProduct();
    expect(userReducer(initialStateUser, addToCartGuitars(cartGuitar))).toEqual({ ...initialStateUser, cartGuitars: [[cartGuitar, 1]], });
  });
  it('Should increment count in concrete card guitar item', () => {
    const cartGuitars: [ProductProps, number][] = [[getMockProduct(), 1], [{ ...getMockProduct(), id: 10, }, 3]];
    expect(userReducer({ ...initialStateUser, cartGuitars: cartGuitars, }, addToCartGuitars({ ...getMockProduct(), id: 10, }))).toEqual({ ...initialStateUser, cartGuitars: [[getMockProduct(), 1], [{ ...getMockProduct(), id: 10, }, 4]], });
  });
  it('Should remove from cart guitars if count === 1', () => {
    const cartGuitars: [ProductProps, number][] = [[getMockProduct(), 1]];
    expect(userReducer({ ...initialStateUser, cartGuitars: cartGuitars, }, removeFromCartGuitars(getMockProduct()))).toEqual(initialStateUser);
  });
  it('Should remove count for concrete cart guitars item', () => {
    const cartGuitars: [ProductProps, number][] = [[getMockProduct(), 2]];
    expect(userReducer({ ...initialStateUser, cartGuitars: cartGuitars, }, removeFromCartGuitars(getMockProduct()))).toEqual({ ...initialStateUser, cartGuitars: [[getMockProduct(), 1]], });
  });
  it('Should remove guitar cart item from cart even if count > 1', () => {
    const cartGuitars: [ProductProps, number][] = [[getMockProduct(), 10]];
    expect(userReducer({ ...initialStateUser, cartGuitars: cartGuitars, }, removeFullCountGuitarFromCart(getMockProduct()))).toEqual(initialStateUser);
  });
  it('Should set count for concrete cart guitars item', () => {
    const cartGuitars: [ProductProps, number][] = [[getMockProduct(), 2]];
    expect(userReducer({ ...initialStateUser, cartGuitars: cartGuitars, }, setGuitarsCount([getMockProduct(), 13]))).toEqual({ ...initialStateUser, cartGuitars: [[getMockProduct(), 13]], });
  });
  it('Should set payload to cartProduct', () => {
    expect(userReducer(initialStateUser, setCartProduct(getMockProduct()))).toEqual({ ...initialStateUser, cartProduct: getMockProduct(), });
  });
  it('Should set payload to currentSale', () => {
    expect(userReducer(initialStateUser, setCurrentSale(30))).toEqual({ ...initialStateUser, currentSale: 30, });
  });
});
