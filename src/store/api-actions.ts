/* eslint-disable no-console */
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { toast } from 'react-toastify';
import { ProductProps } from '../types/product-type';
import { APIRoute, PRODUCTS_LIMIT_ON_PAGE } from '../utils/const';
import { setComments, setGuitars, setPriceRangeAcoustic, setPriceRangeAll, setPriceRangeElectric, setPriceRangeUkulele, setSearchedGuitars, setShouldShowSpinner, setTotalCount } from './actions';
import { RootProps } from './reducers/root-reducer';


export type ThunkResult<R = Promise<void>> = ThunkAction<R, RootProps, AxiosInstance, Action
>;

export const getProductsFromServer =
  (query = '', startRange: number): ThunkResult => async (dispatch, _getState, api) => {
    console.log(query);
    const responseWithRange: AxiosResponse = await api.get(`${APIRoute.Guitars}?${query}&${`_start=${startRange}&_limit=${PRODUCTS_LIMIT_ON_PAGE}`}`);
    const headers: AxiosResponseHeaders = responseWithRange.headers;
    const actualGuitars: ProductProps[] = responseWithRange.data;
    if (actualGuitars.length === 0) {
      toast.warn('Cannot find guitars with this parameters');
      dispatch(setGuitars([]));
      dispatch(setTotalCount(0));
      dispatch(setShouldShowSpinner(false));
    } else {
      dispatch(setTotalCount(+headers['x-total-count']));
      dispatch(setShouldShowSpinner(false));
      dispatch(setGuitars(actualGuitars));
    }
  };

export const getSearchedProducts = (query: string): ThunkResult => async (dispatch, _getState, api) => {
  const response = await api.get(`${APIRoute.Guitars}?${query}`);
  dispatch(setSearchedGuitars(response.data));
};

export const getPriceRange = (): ThunkResult => async (dispatch, _getState, api) => {
  const responseAll = await api.get(`${APIRoute.Guitars}?_sort=price&_order=asc`);
  dispatch(setPriceRangeAll({
    min: String(responseAll.data[0].price),
    max: String(responseAll.data.slice(-1)[0].price),
  }));
  const responseAcoustic = await api.get(`${APIRoute.Guitars}?type=acoustic&_sort=price&_order=asc`);
  dispatch(setPriceRangeAcoustic({
    min: String(responseAcoustic.data[0].price),
    max: String(responseAcoustic.data.slice(-1)[0].price),
  }));
  const responseElectric = await api.get(`${APIRoute.Guitars}?type=electric&_sort=price&_order=asc`);
  dispatch(setPriceRangeElectric({
    min: String(responseElectric.data[0].price),
    max: String(responseElectric.data.slice(-1)[0].price),
  }));
  const responseUkulele = await api.get(`${APIRoute.Guitars}?type=ukulele&_sort=price&_order=asc`);
  dispatch(setPriceRangeUkulele({
    min: String(responseUkulele.data[0].price),
    max: String(responseUkulele.data.slice(-1)[0].price),
  }));
};

export const getCommentsFromServer = (id: number): ThunkResult => async (dispatch, _getState, api) => {
  const response: AxiosResponse = await api.get(`${APIRoute.Guitars}/${id}${APIRoute.Comments}`);
  dispatch(setComments(`${id}-${response.data.length}`));
};
