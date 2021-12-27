/* eslint-disable no-console */
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ProductProps } from '../types/product-type';
import { APIRoute } from '../utils/const';
import { setGuitars } from './actions';
import { RootProps } from './reducer';

export type ThunkResult<R = Promise<void>> = ThunkAction<
  R,
  RootProps,
  AxiosInstance,
  Action
>;

export const getProductsFromServer =
  (): ThunkResult => async (dispatch, _getState, api) => {
    const response = await api.get(APIRoute.Guitars);
    const guitars: ProductProps[] = response.data;
    dispatch(setGuitars(guitars));
  };
