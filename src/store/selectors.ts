import { FilterProps } from '../types/filter-type';
import { PaginationProps } from '../types/pagination-type';
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

export const getMinPrice = (state: RootProps): string => state.minPrice;

export const getMaxPrice = (state: RootProps): string => state.maxPrice;

export const getIsFilterDefault = (state: RootProps): boolean => state.isFilterDefault;

export const getPaginationData = (state: RootProps): PaginationProps => state.paginationData;
