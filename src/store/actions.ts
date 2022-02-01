import { createAction } from '@reduxjs/toolkit';
import { FilterProps } from '../types/filter-type';
import { PriceRangeProps } from '../types/price-range-type';
import { ProductProps } from '../types/product-type';
import { SortType } from '../utils/const';

export enum Action {
  SetGuitars = 'setGuitars',
  SetCurrentSort = 'setCurrentSort',
  SetCurrentFilters = 'setCurrentFilters',
  SetSearchQuery = 'setSearchQuery',
  SetSearchedGuitars = 'setSearchedGuitars',
  SetIsFilterDefault = 'setIsFilterDefault',
  SetStartRange = 'setStartRange',
  SetTotalCount = 'setTotalCount,',
  SetPriceRangeAll = 'setPriceRangeAll',
  SetCurrentPage = 'setCurrentPage',
  SetComments = 'setComments',
  SetShouldShowSpinner = 'setShouldShowSpinner',
  SetCurrentQuery = 'setCurrentQuery',
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

export const setStartRange = createAction<number>(Action.SetStartRange);

export const setTotalCount = createAction<number>(Action.SetTotalCount);

export const setPriceRangeAll = createAction<PriceRangeProps>(Action.SetPriceRangeAll);

export const setCurrentPage = createAction<string>(Action.SetCurrentPage);

export const setComments = createAction<string>(Action.SetComments);

export const setShouldShowSpinner = createAction<boolean>(Action.SetShouldShowSpinner);

export const setCurrentQuery = createAction<string>(Action.SetCurrentQuery);
