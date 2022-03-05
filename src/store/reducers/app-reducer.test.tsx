import { CurrentTab } from '../../utils/const';
import { getMockProduct, getMockReview } from '../../utils/mock';
import { setReviews, setGuitars, setPriceRangeAll, setSearchedGuitars, setShouldShowSpinner, setCurrentTab, setCurrentProduct, setIsModalReviewSuccessOpen, setIsModalReviewOpen, updateReviews, updateReviewsCounts, setIsModalToCartOpen, setIsModalToCartSuccessOpen, setLastQuantity } from '../actions';
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
  it('Should set payload to reviews', () => {
    expect(appReducer(initialStateApp, setReviews([getMockReview(), getMockReview()]))).toEqual({ ...initialStateApp, reviews: [getMockReview(), getMockReview()], });
  });
  it('Should set payload to isShouldShowSpinner', () => {
    expect(appReducer(initialStateApp, setShouldShowSpinner(true))).toEqual({ ...initialStateApp, shouldShowSpinner: true, });
  });
  it('Should set payload to currentTab', () => {
    expect(appReducer(initialStateApp, setCurrentTab(CurrentTab.Description))).toEqual({ ...initialStateApp, currentTab: CurrentTab.Description, });
  });
  it('Should set payload to currentProduct', () => {
    expect(appReducer(initialStateApp, setCurrentProduct(getMockProduct()))).toEqual({ ...initialStateApp, currentProduct: getMockProduct(), });
  });
  it('Should set payload to isModalReviewSuccessOpen', () => {
    expect(appReducer(initialStateApp, setIsModalReviewSuccessOpen(true))).toEqual({ ...initialStateApp, isModalReviewSuccessOpen: true, });
  });
  it('Should set payload to isModalReviewOpen', () => {
    expect(appReducer(initialStateApp, setIsModalReviewOpen(true))).toEqual({ ...initialStateApp, isModalReviewOpen: true, });
  });
  it('Should add new review to reviews', () => {
    expect(appReducer(initialStateApp, updateReviews(getMockReview()))).toEqual({ ...initialStateApp, reviews: [getMockReview()], });
  });
  it('Should add new reviewsCount to reviewsCounts', () => {
    const reviewsCount = '1-2';
    expect(appReducer(initialStateApp, updateReviewsCounts(reviewsCount))).toEqual({ ...initialStateApp, reviewsCounts: [reviewsCount], });
  });
  it('Should set payload to isModalToCartOpen', () => {
    expect(appReducer(initialStateApp, setIsModalToCartOpen(true))).toEqual({ ...initialStateApp, isModalToCartOpen: true, });
  });
  it('Should set payload to isModalCartSuccessOpen', () => {
    expect(appReducer(initialStateApp, setIsModalToCartSuccessOpen(true))).toEqual({ ...initialStateApp, isModalToCartSuccessOpen: true, });
  });
  it('Should set payload to lastQuantity', () => {
    expect(appReducer(initialStateApp, setLastQuantity(5))).toEqual({ ...initialStateApp, lastQuantity: 5, });
  });
});

