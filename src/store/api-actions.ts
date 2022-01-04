/* eslint-disable no-console */
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ProductProps } from '../types/product-type';
import { APIRoute } from '../utils/const';
import { setGuitars, setSearchedGuitars } from './actions';
import { RootProps } from './reducer';

export type ThunkResult<R = Promise<void>> = ThunkAction<R, RootProps, AxiosInstance, Action
>;

export const getProductsFromServer =
  (query = ''): ThunkResult => async (dispatch, _getState, api) => {
    const response = await api.get(`${APIRoute.Guitars}?${query}`);
    const guitars: ProductProps[] = response.data;
    dispatch(setGuitars(guitars));
  };

export const getSearchedProducts = (query: string): ThunkResult => async (dispatch, _getState, api) => {
  const response = await api.get(`${APIRoute.Guitars}?${query}`);
  dispatch(setSearchedGuitars(response.data));
};
