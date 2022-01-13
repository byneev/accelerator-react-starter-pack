/* eslint-disable no-console */
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { ProductProps } from '../types/product-type';
import { APIRoute, PRODUTS_LIMIT_ON_PAGE } from '../utils/const';
import { setGuitars, setPriceMax, setPriceMin, setSearchedGuitars, setTotalCount } from './actions';
import { RootProps } from './reducer';

export type ThunkResult<R = Promise<void>> = ThunkAction<R, RootProps, AxiosInstance, Action
>;

export const getDefaultProducts = (): ThunkResult => async (dispatch, _getState, api) => {
  const response: AxiosResponse = await api.get(`${APIRoute.Guitars}`);
  const guitars: ProductProps[] = response.data.slice().sort((a: ProductProps, b: ProductProps) => a.price - b.price);
  dispatch(setPriceMin(String(guitars[0].price)));
  dispatch(setPriceMax(String(guitars.slice(-1)[0].price)));
  dispatch(setGuitars(guitars));
};

export const getProductsFromServer =
  (query = '', startRange: number): ThunkResult => async (dispatch, _getState, api) => {
    console.log(query);
    const response: AxiosResponse = await api.get(`${APIRoute.Guitars}?${query}`);
    const guitars: ProductProps[] = response.data;
    console.log(guitars);
    if (query.match(/order/)) {
      dispatch(setPriceMin(String(guitars[0].price < guitars.slice(-1)[0].price ? guitars[0].price : guitars.slice(-1)[0].price)));
      dispatch(setPriceMax(String(guitars.slice(-1)[0].price > guitars[0].price ? guitars.slice(-1)[0].price : guitars[0].price)));
    } else {
      const sortedGuitars = guitars.slice().sort((a: ProductProps, b: ProductProps) => a.price - b.price);
      dispatch(setPriceMin(String(sortedGuitars[0].price)));
      dispatch(setPriceMax(String(sortedGuitars.slice(-1)[0].price)));
    }
    const responseWithRange: AxiosResponse = await api.get(`${APIRoute.Guitars}?${query}&${`_start=${startRange}&_limit=${PRODUTS_LIMIT_ON_PAGE}`}`);
    const headers: AxiosResponseHeaders = responseWithRange.headers;
    const actualGuitars: ProductProps[] = responseWithRange.data;
    dispatch(setTotalCount(+headers['x-total-count']));
    dispatch(setGuitars(actualGuitars));
  };

export const getSearchedProducts = (query: string): ThunkResult => async (dispatch, _getState, api) => {
  const response = await api.get(`${APIRoute.Guitars}?${query}`);
  dispatch(setSearchedGuitars(response.data));
};
