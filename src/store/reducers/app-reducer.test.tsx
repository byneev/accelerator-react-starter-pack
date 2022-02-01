import { getMockProduct } from '../../utils/mock';
import { setComments, setGuitars, setPriceRangeAll, setSearchedGuitars } from '../actions';
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
  it('Should set payload to searchedGuitars', () => {
    const guitars = [getMockProduct(), getMockProduct()];
    expect(appReducer(initialStateApp, setSearchedGuitars(guitars))).toEqual({
      ...initialStateApp, searchedGuitars: guitars,
    });
  });
  it('Should set payload to priceRangeAll', () => {
    expect(appReducer(initialStateApp, setPriceRangeAll({ min: '100', max: '999', }))).toEqual({ ...initialStateApp, priceRangeAll: { min: '100', max: '999', }, });
  });
  it('Should set payload to comments', () => {
    expect(appReducer(initialStateApp, setComments('1-4'))).toEqual({ ...initialStateApp, comments: ['1-4'], });
  });
});
