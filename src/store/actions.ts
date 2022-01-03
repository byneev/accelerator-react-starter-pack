import { createAction } from '@reduxjs/toolkit';
import { FilterProps } from '../types/filter-type';
import { ProductProps } from '../types/product-type';
import { SortType } from '../utils/const';

export enum Action {
  SetGuitars = 'setGuitars',
  SetCurrentSort = 'setCurrentSort',
  SetCurrentFilters = 'setCurrentFilters',
  SetSearchQuery = 'setSearchQuery',
  SetSearchedGuitars = 'setSearchedGuitars',
  SetIsFilterDefault = 'setIsFilterDefault',
}

export const setGuitars = createAction<ProductProps[]>(Action.SetGuitars);

export const setCurrentSort = createAction<[SortType, SortType]>(
  Action.SetCurrentSort
);

export const setCurrentFilters = createAction<FilterProps>(
  Action.SetCurrentFilters
);

export const setSearchQuery = createAction<string>(Action.SetSearchQuery);

export const setSearchedGuitars = createAction<ProductProps[]>(Action.SetSearchedGuitars);

export const setIsFilterDefault = createAction<boolean>(Action.SetIsFilterDefault);
