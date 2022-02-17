import { createSelector } from 'reselect';
import { CommentProps } from '../types/comment-type';
import { FilterProps } from '../types/filter-type';
import { PriceRangeProps } from '../types/price-range-type';
import { ProductProps } from '../types/product-type';
import { CurrentTab, SortType } from '../utils/const';
import { NameSpace, RootProps } from './reducers/root-reducer';

export const getGuitars = (state: RootProps): ProductProps[] => state[NameSpace.App].guitars;

export const getCurrentSort = (state: RootProps): [SortType, SortType] =>
  state[NameSpace.User].currentSort;

export const getCurrentFilters = (state: RootProps): FilterProps =>
  state[NameSpace.User].currentFilters;

export const getSearchQuery = (state: RootProps): string => state[NameSpace.User].searchQuery;

export const getSearchedGuitars = (state: RootProps): ProductProps[] => state[NameSpace.App].searchedGuitars;

export const getStartRange = (state: RootProps): number => state[NameSpace.User].startRange;

export const getTotalCount = (state: RootProps): number => state[NameSpace.User].totalCount;

export const getPriceRangeAll = (state: RootProps): PriceRangeProps => state[NameSpace.App].priceRangeAll;

export const getCurrentPage = (state: RootProps): string => state[NameSpace.User].currentPage;

export const getReviews = (state: RootProps): CommentProps[] => state[NameSpace.App].reviews;

export const getShouldShowSpinner = (state: RootProps): boolean => state[NameSpace.App].shouldShowSpinner;

export const getCurrentQuery = (state: RootProps): string => state[NameSpace.User].currentQuery;

export const getCurrentTab = (state: RootProps): CurrentTab => state[NameSpace.App].currentTab;

export const getCurrentProduct = (state: RootProps): ProductProps | null => state[NameSpace.App].currentProduct;

export const getIsModalReviewSuccessOpen = (state: RootProps): boolean => state[NameSpace.App].isModalReviewSuccessOpen;

export const getIsModalReviewOpen = (state: RootProps): boolean => state[NameSpace.App].isModalReviewOpen;

export const getStartWithQueryGuitars = createSelector([getSearchedGuitars, getSearchQuery], (guitars, query) => guitars.filter((guitar) => guitar.name.toLowerCase().startsWith(query.split('=')[1].toLowerCase())));

export const getSortedReviews = createSelector(getReviews, (reviews) => reviews.slice().sort((reviewA: CommentProps, reviewB: CommentProps) => Date.parse(reviewB.createAt) - Date.parse(reviewA.createAt)));
