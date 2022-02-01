import { createReducer } from '@reduxjs/toolkit';
import { PriceRangeProps } from '../../types/price-range-type';
import { ProductProps } from '../../types/product-type';
import {
  setGuitars, setSearchedGuitars, setPriceRangeAll, setComments, setShouldShowSpinner
} from '../actions';

export type InitialStateAppProps = {
  guitars: ProductProps[];
  searchedGuitars: ProductProps[];
  priceRangeAll: PriceRangeProps;
  comments: string[];
  shouldShowSpinner: boolean;
};

export const initialStateApp: InitialStateAppProps = {
  guitars: [],
  searchedGuitars: [],
  priceRangeAll: {
    min: '',
    max: '',
  },
  comments: [],
  shouldShowSpinner: false,
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
    .addCase(setComments, (state, { payload, }) => {
      state.comments.push(payload);
    })
    .addCase(setShouldShowSpinner, (state, { payload, }) => {
      state.shouldShowSpinner = payload;
    });
});
