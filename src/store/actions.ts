import { createAction } from '@reduxjs/toolkit';
import { ProductProps } from '../types/product-type';
import { SortType } from '../utils/const';

export enum Action {
  SetGuitars = 'setGuitars',
  SetCurrentSort = 'setCurrentSort',
  SetCurrentFilters = 'setCurrentFilters',
}

export const setGuitars = createAction<ProductProps[]>(Action.SetGuitars);

export const setCurrentSort = createAction<SortType[]>(Action.SetCurrentSort);

export const setCurrentFilters = createAction<FilterType[]>(Action.SetCurrentFilters);
