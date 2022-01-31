/* eslint-disable no-console */
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { ProductProps } from '../types/product-type';
import { APIRoute, PRODUCTS_LIMIT_ON_PAGE } from '../utils/const';
import { setComments, setGuitars, setIsInnerChange, setPriceRangeAll, setSearchedGuitars, setShouldShowSpinner, setTotalCount } from './actions';
import { RootProps } from './reducers/root-reducer';


export type ThunkResult<R = Promise<void>> = ThunkAction<R, RootProps, AxiosInstance, Action
>;

export const getRangeByQuery = (query: string): ThunkResult => async (dispatch, _getState, api) => {
  let splitter = 'price_gte=';
  if (query.match(/stringCount/)) {
    splitter = 'stringCount';
  }
  const splitedQuery = query.split(splitter);
  dispatch(setIsInnerChange(true));
  const responseWithoutRange: AxiosResponse = await api.get(`${APIRoute.Guitars}${splitedQuery[0]}`);
  const sortedGuitars = responseWithoutRange.data.sort((guitarA: ProductProps, guitarB: ProductProps) => guitarA.price - guitarB.price);
  dispatch(setPriceRangeAll({ min: String(sortedGuitars[0].price), max: String(sortedGuitars.slice(-1)[0].price), }));
};

export const getProductsFromServer =
  (query = '', startRange: number): ThunkResult => async (dispatch, _getState, api) => {
    const responseWithRange: AxiosResponse = await api.get(`${APIRoute.Guitars}?${query}&${`_start=${startRange}&_limit=${PRODUCTS_LIMIT_ON_PAGE}`}`);
    const headers: AxiosResponseHeaders = responseWithRange.headers;
    const actualGuitars: ProductProps[] = responseWithRange.data;
    dispatch(setTotalCount(+headers['x-total-count']));
    dispatch(setGuitars(actualGuitars));
    dispatch(setShouldShowSpinner(false));
  };

export const getSearchedProducts = (query: string): ThunkResult => async (dispatch, _getState, api) => {
  const response = await api.get(`${APIRoute.Guitars}?${query}`);
  dispatch(setSearchedGuitars(response.data));
};

export const getCommentsFromServer = (id: number): ThunkResult => async (dispatch, _getState, api) => {
  const response: AxiosResponse = await api.get(`${APIRoute.Guitars}/${id}${APIRoute.Comments}`);
  dispatch(setComments(`${id}-${response.data.length}`));
};
