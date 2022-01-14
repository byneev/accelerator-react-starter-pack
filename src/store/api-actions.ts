/* eslint-disable no-console */
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { ProductProps } from '../types/product-type';
import { APIRoute, PRODUTS_LIMIT_ON_PAGE } from '../utils/const';
import { setGuitars, setPriceRangeAcoustic, setPriceRangeAll, setPriceRangeElectric, setPriceRangeUkulele, setSearchedGuitars, setTotalCount } from './actions';
import { RootProps } from './reducer';

export type ThunkResult<R = Promise<void>> = ThunkAction<R, RootProps, AxiosInstance, Action
>;

export const getProductsFromServer =
  (query = '', startRange: number): ThunkResult => async (dispatch, _getState, api) => {
    console.log(query);
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

export const getPriceRange = (): ThunkResult => async (dispatch, _getState, api) => {
  const responseAll = await api.get(`${APIRoute.Guitars}?_sort=price&_order=asc`);
  dispatch(setPriceRangeAll({
    min: responseAll.data[0].price,
    max: responseAll.data.slice(-1)[0].price,
  }));
  const responseAcoustic = await api.get(`${APIRoute.Guitars}?type=acoustic&_sort=price&_order=asc`);
  dispatch(setPriceRangeAcoustic({
    min: responseAcoustic.data[0].price,
    max: responseAcoustic.data.slice(-1)[0].price,
  }));
  const responseElectric = await api.get(`${APIRoute.Guitars}?type=electric&_sort=price&_order=asc`);
  dispatch(setPriceRangeElectric({
    min: responseElectric.data[0].price,
    max: responseElectric.data.slice(-1)[0].price,
  }));
  const responseUkulele = await api.get(`${APIRoute.Guitars}?type=ukulele&_sort=price&_order=asc`);
  dispatch(setPriceRangeUkulele({
    min: responseUkulele.data[0].price,
    max: responseUkulele.data.slice(-1)[0].price,
  }));
};
