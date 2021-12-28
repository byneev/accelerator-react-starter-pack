import { FilterProps } from '../types/filter-type';
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
