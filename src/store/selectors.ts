import { FilterProps } from '../types/filter-type';
import { PriceRangeProps } from '../types/price-range-type';
import { ProductProps } from '../types/product-type';
import { SortType } from '../utils/const';
import { RootProps } from './reducer';

export const getGuitars = (state: RootProps): ProductProps[] => state.guitars;

export const getCurrentSort = (state: RootProps): [SortType, SortType] =>
  state.currentSort;

export const getCurrentFilters = (state: RootProps): FilterProps =>
  state.currentFilters;

export const getSearchQuery = (state: RootProps): string => state.searchQuery;

export const getSearchedGuitars = (state: RootProps): ProductProps[] => state.searchedGuitars;

export const getIsFilterDefault = (state: RootProps): boolean => state.isFilterDefault;

export const getStartRange = (state: RootProps): number => state.startRange;

export const getTotalCount = (state: RootProps): number => state.totalCount;

export const getPriceRangeAcoustic = (state: RootProps): PriceRangeProps => state.priceRangeAcoustic;

export const getPriceRangeElectric = (state: RootProps): PriceRangeProps => state.priceRangeElectric;

export const getPriceRangeUkulele = (state: RootProps): PriceRangeProps => state.priceRangeUkulele;

export const getPriceRangeAll = (state: RootProps): PriceRangeProps => state.priceRangeAll;
