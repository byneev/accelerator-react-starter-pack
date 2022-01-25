/* eslint-disable no-console */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { DefaultFunctionProps } from '../types/default-function-type';
import { BASE_URL, HTTPCode, TIMEOUT_TIME } from './const';

export const createAPI = (
  cbOn404: DefaultFunctionProps,
  cbOn400: DefaultFunctionProps,
  cbOn401: DefaultFunctionProps,
  cbOn503: DefaultFunctionProps
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
        default:
          cbOn503();
      }
      return Promise.reject();
    }
  );

  return api;
};
