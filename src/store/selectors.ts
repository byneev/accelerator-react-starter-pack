import { FilterProps } from '../types/filter-type';
import { PriceRangeProps } from '../types/price-range-type';
import { ProductProps } from '../types/product-type';
import { SortType } from '../utils/const';
import { NameSpace, RootProps } from './reducers/root-reducer';

export const getGuitars = (state: RootProps): ProductProps[] => state[NameSpace.App].guitars;

export const getCurrentSort = (state: RootProps): [SortType, SortType] =>
  state[NameSpace.User].currentSort;

export const getCurrentFilters = (state: RootProps): FilterProps =>
  state[NameSpace.User].currentFilters;

export const getSearchQuery = (state: RootProps): string => state[NameSpace.User].searchQuery;

export const getSearchedGuitars = (state: RootProps): ProductProps[] => state[NameSpace.App].searchedGuitars;

export const getIsFilterDefault = (state: RootProps): boolean => state[NameSpace.User].isFilterDefault;

export const getStartRange = (state: RootProps): number => state[NameSpace.User].startRange;

export const getTotalCount = (state: RootProps): number => state[NameSpace.User].totalCount;

export const getPriceRangeAcoustic = (state: RootProps): PriceRangeProps => state[NameSpace.App].priceRangeAcoustic;

export const getPriceRangeElectric = (state: RootProps): PriceRangeProps => state[NameSpace.App].priceRangeElectric;

export const getPriceRangeUkulele = (state: RootProps): PriceRangeProps => state[NameSpace.App].priceRangeUkulele;

export const getPriceRangeAll = (state: RootProps): PriceRangeProps => state[NameSpace.App].priceRangeAll;

export const getCurrentPage = (state: RootProps): string => state[NameSpace.User].currentPage;

export const getComments = (state: RootProps): string[] => state[NameSpace.App].comments;
