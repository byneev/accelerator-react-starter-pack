import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { store } from '..';
import { setShouldShowSpinner } from '../store/actions';
import { DefaultFunctionProps } from '../types/default-function-type';
import { BASE_URL, HTTPCode, TIMEOUT_TIME } from './const';

export const createAPI = (
  cbOn404: DefaultFunctionProps,
  cbOn400: DefaultFunctionProps,
  cbOn401: DefaultFunctionProps,
  cbOnGte500: DefaultFunctionProps
): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT_TIME,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      switch (error.response?.status) {
        case HTTPCode.NotFound:
          cbOn404();
          break;
        case HTTPCode.BadRequest:
          cbOn400();
          break;
        case HTTPCode.Unauthorized:
          cbOn401();
          break;
      }
      if (error.response) {
        if (error.response?.status >= 500) {
          cbOnGte500();
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};
