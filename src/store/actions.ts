import { createAction } from '@reduxjs/toolkit';
import { CommentProps } from '../types/comment-type';
import { FilterProps } from '../types/filter-type';
import { PriceRangeProps } from '../types/price-range-type';
import { ProductProps } from '../types/product-type';
import { CurrentTab, SortType } from '../utils/const';

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
  SetReviews = 'setComments',
  SetShouldShowSpinner = 'setShouldShowSpinner',
  SetCurrentQuery = 'setCurrentQuery',
  SetCurrentTab = 'setCurrentTab',
  SetCurrentProduct = 'setCurrentProduct',
  SetIsModalReviewSuccessOpen = 'setIsModalReviewSuccessOpen',
  SetIsModalReviewOpen = 'setIsModalReviewOpen',
  UpdateReviews = 'updateReviews',
  UpdateReviewsCounts = 'updateReviewsCounts',
  SetSearchInput = 'setSearchInput',
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

export const setReviews = createAction<CommentProps[]>(Action.SetReviews);

export const setShouldShowSpinner = createAction<boolean>(Action.SetShouldShowSpinner);

export const setCurrentQuery = createAction<string>(Action.SetCurrentQuery);

export const setCurrentTab = createAction<CurrentTab>(Action.SetCurrentTab);

export const setCurrentProduct = createAction<ProductProps | null>(Action.SetCurrentProduct);

export const setIsModalReviewSuccessOpen = createAction<boolean>(Action.SetIsModalReviewSuccessOpen);

export const setIsModalReviewOpen = createAction<boolean>(Action.SetIsModalReviewOpen);

export const updateReviews = createAction<CommentProps>(Action.UpdateReviews);

export const updateReviewsCounts = createAction<string>(Action.UpdateReviewsCounts);

export const setSearchInput = createAction<string>(Action.SetSearchInput);
