/* eslint-disable no-console */

import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { CommentPostProps } from '../types/comment-type';
import { ProductProps } from '../types/product-type';
import { APIRoute, DEFAULT_PAGE, PRODUCTS_LIMIT_ON_PAGE } from '../utils/const';
import { checkIsOnline, errorBadFiltersWarn } from '../utils/helpers';
import { setReviews, setCurrentFilters, setCurrentPage, setCurrentSort, setGuitars, setPriceRangeAll, setSearchedGuitars, setShouldShowSpinner, setTotalCount, setCurrentProduct, setIsModalReviewSuccessOpen, setIsModalReviewOpen } from './actions';
import { RootProps } from './reducers/root-reducer';
import { initialStateUser } from './reducers/user-reducer';


export type ThunkResult<R = Promise<void>> = ThunkAction<R, RootProps, AxiosInstance, Action
>;

export const getRangeByQuery = (query: string): ThunkResult => async (dispatch, _getState, api) => {
  checkIsOnline();
  let splitter = 'price_gte=';
  if (query.match(/stringCount/)) {
    splitter = 'stringCount';
  }
  const splitedQuery = query.split(splitter);
  const responseWithoutRange: AxiosResponse = await api.get(`${APIRoute.Guitars}${splitedQuery[0]}`);
  const sortedGuitars = responseWithoutRange.data.sort((guitarA: ProductProps, guitarB: ProductProps) => guitarA.price - guitarB.price);
  dispatch(setPriceRangeAll({ min: String(sortedGuitars[0].price), max: String(sortedGuitars.slice(-1)[0].price), }));
};

export const getProductsFromServer =
  (query = '', startRange: number): ThunkResult => async (dispatch, _getState, api) => {
    checkIsOnline();
    const responseWithRange: AxiosResponse = await api.get(`${APIRoute.Guitars}?${query}&${`_start=${startRange}&_limit=${PRODUCTS_LIMIT_ON_PAGE}`}`);
    const headers: AxiosResponseHeaders = responseWithRange.headers;
    const actualGuitars: ProductProps[] = responseWithRange.data;
    dispatch(setGuitars(actualGuitars));
    if (actualGuitars.length !== 0) {
      dispatch(setTotalCount(+headers['x-total-count']));
    } else {
      errorBadFiltersWarn();
      const defaultResponse: AxiosResponse = await api.get(`${APIRoute.Guitars}?_start=0&_limit=${PRODUCTS_LIMIT_ON_PAGE}`);
      dispatch(setGuitars(defaultResponse.data));
      dispatch(setTotalCount(+defaultResponse.headers['x-total-count']));
      dispatch(setCurrentPage(DEFAULT_PAGE));
      dispatch(setCurrentFilters(initialStateUser.currentFilters));
      dispatch(setCurrentSort(initialStateUser.currentSort));
    }
    dispatch(setShouldShowSpinner(false));
  };

export const getSearchedProducts = (query: string): ThunkResult => async (dispatch, _getState, api) => {
  checkIsOnline();
  const response = await api.get(`${APIRoute.Guitars}?${query}`);
  dispatch(setSearchedGuitars(response.data));
};

export const getCommentsFromServer = (id: number): ThunkResult => async (dispatch, _getState, api) => {
  checkIsOnline();
  const response: AxiosResponse = await api.get(`${APIRoute.Guitars}/${id}${APIRoute.Comments}`);
  dispatch(setReviews(response.data));
};

export const getProductById = (id: number): ThunkResult => async (dispatch, _getState, api) => {
  checkIsOnline();
  const response: AxiosResponse = await api.get(`${APIRoute.Guitars}/${id}`);
  dispatch(setCurrentProduct(response.data));
};

export const sendReviewToServer = (comment: CommentPostProps): ThunkResult => async (dispatch, _getState, api) => {
  checkIsOnline();
  const response = await api.post(`${APIRoute.Comments}`, comment);
  console.log(response.data);
  // dispatch(setReviews(response.data));
  // dispatch(setIsModalReviewOpen(false));
  // dispatch(setIsModalReviewSuccessOpen(true));
};
