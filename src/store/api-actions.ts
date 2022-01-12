/* eslint-disable no-console */
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { PaginationProps } from '../types/pagination-type';
import { ProductProps } from '../types/product-type';
import { APIRoute, PRODUTS_LIMIT_ON_PAGE } from '../utils/const';
import { setCurrentFilters, setGuitars, setPaginationData, setPriceMax, setPriceMin, setSearchedGuitars } from './actions';
import { initialState, RootProps } from './reducer';

export type ThunkResult<R = Promise<void>> = ThunkAction<R, RootProps, AxiosInstance, Action
>;

export const getDefaultProducts = (): ThunkResult => async (dispatch, _getState, api) => {
  const response: AxiosResponse = await api.get(`${APIRoute.Guitars}`);
  const guitars: ProductProps[] = response.data.slice().sort((a: ProductProps, b: ProductProps) => a.price - b.price);
  dispatch(setPriceMin(String(guitars[0].price)));
  dispatch(setPriceMax(String(guitars.slice(-1)[0].price)));
};

export const getProductsFromServer =
  (query = '', paginationData: PaginationProps): ThunkResult => async (dispatch, _getState, api) => {
    const response: AxiosResponse = await api.get(`${APIRoute.Guitars}?${query}`);
    const guitars: ProductProps[] = response.data;
    console.log(query);
    if (query.match(/order/)) {
      dispatch(setPriceMin(String(guitars[0].price < guitars.slice(-1)[0].price ? guitars[0].price : guitars.slice(-1)[0].price)));
      dispatch(setPriceMax(String(guitars.slice(-1)[0].price > guitars[0].price ? guitars.slice(-1)[0].price : guitars[0].price)));
    } else {
      const sortedGuitars = guitars.slice().sort((a: ProductProps, b: ProductProps) => a.price - b.price);
      dispatch(setPriceMin(String(sortedGuitars[0].price)));
      dispatch(setPriceMax(String(sortedGuitars.slice(-1)[0].price)));
    }
    const responseWithRange: AxiosResponse = await api.get(`${APIRoute.Guitars}?${query}&${`_start=${paginationData.startRange}&_limit=${PRODUTS_LIMIT_ON_PAGE}`}`);
    const headers: AxiosResponseHeaders = responseWithRange.headers;
    const actualGuitars: ProductProps[] = responseWithRange.data;
    dispatch(setGuitars(actualGuitars));
    // dispatch(setPaginationData({ startRange: paginationData.startRange, totalCount: +headers['x-total-count'], }));
  };

export const getSearchedProducts = (query: string): ThunkResult => async (dispatch, _getState, api) => {
  const response = await api.get(`${APIRoute.Guitars}?${query}`);
  dispatch(setSearchedGuitars(response.data));
};
