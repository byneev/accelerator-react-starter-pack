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
  SetPriceRangeAcoustic = 'setPriceRangeAcoustic',
  SetPriceRangeElectric = 'setPriceRangeElectric',
  SetPriceRangeUkulele = 'setPriceRangeUkulele',
  SetPriceRangeAll = 'setPriceRangeAll',
  SetCurrentPage = 'setCurrentPage',
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

export const setStartRange = createAction<number>(Action.SetStartRange);

export const setTotalCount = createAction<number>(Action.SetTotalCount);

export const setPriceRangeAcoustic = createAction<PriceRangeProps>(Action.SetPriceRangeAcoustic);

export const setPriceRangeElectric = createAction<PriceRangeProps>(Action.SetPriceRangeElectric);

export const setPriceRangeUkulele = createAction<PriceRangeProps>(Action.SetPriceRangeUkulele);

export const setPriceRangeAll = createAction<PriceRangeProps>(Action.SetPriceRangeAll);

export const setCurrentPage = createAction<string>(Action.SetCurrentPage);
