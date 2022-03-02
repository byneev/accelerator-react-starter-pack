import { createReducer } from '@reduxjs/toolkit';
import { CommentProps } from '../../types/comment-type';
import { PriceRangeProps } from '../../types/price-range-type';
import { ProductProps } from '../../types/product-type';
import { CurrentTab } from '../../utils/const';
import {
  setGuitars, setSearchedGuitars, setPriceRangeAll, setReviews, setShouldShowSpinner, setCurrentTab, setCurrentProduct, setIsModalReviewSuccessOpen, setIsModalReviewOpen, updateReviews, updateReviewsCounts
} from '../actions';

export type InitialStateAppProps = {
  guitars: ProductProps[];
  searchedGuitars: ProductProps[];
  priceRangeAll: PriceRangeProps;
  reviews: CommentProps[];
  shouldShowSpinner: boolean;
  currentTab: CurrentTab;
  currentProduct: ProductProps | null;
  isModalReviewSuccessOpen: boolean;
  isModalReviewOpen: boolean;
  reviewsCounts: string[];
  isModalToCartOpen: boolean;
  isModalToCartSuccessOpen: boolean;
};

export const initialStateApp: InitialStateAppProps = {
  guitars: [],
  searchedGuitars: [],
  priceRangeAll: {
    min: '',
    max: '',
  },
  reviews: [],
  shouldShowSpinner: false,
  currentTab: CurrentTab.Characteristics,
  currentProduct: null,
  isModalReviewSuccessOpen: false,
  isModalReviewOpen: false,
  reviewsCounts: [],
  isModalToCartOpen: false,
  isModalToCartSuccessOpen: false,
};

export const appReducer = createReducer(initialStateApp, (builder) => {
  builder
    .addCase(setGuitars, (state, { payload, }) => {
      state.guitars = payload;
    })
    .addCase(setSearchedGuitars, (state, { payload, }) => {
      state.searchedGuitars = payload;
    })
    .addCase(setPriceRangeAll, (state, { payload, }) => {
      state.priceRangeAll = payload;
    })
    .addCase(setReviews, (state, { payload, }) => {
      state.reviews = payload;
    })
    .addCase(setShouldShowSpinner, (state, { payload, }) => {
      state.shouldShowSpinner = payload;
    })
    .addCase(setCurrentTab, (state, { payload, }) => {
      state.currentTab = payload;
    })
    .addCase(setCurrentProduct, (state, { payload, }) => {
      state.currentProduct = payload;
    })
    .addCase(setIsModalReviewSuccessOpen, (state, { payload, }) => {
      state.isModalReviewSuccessOpen = payload;
    })
    .addCase(setIsModalReviewOpen, (state, { payload, }) => {
      state.isModalReviewOpen = payload;
    })
    .addCase(updateReviews, (state, { payload, }) => {
      state.reviews.push(payload);
    })
    .addCase(updateReviewsCounts, (state, { payload, }) => {
      state.reviewsCounts.push(payload);
    });
});
