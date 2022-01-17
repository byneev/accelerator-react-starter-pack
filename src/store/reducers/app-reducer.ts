import { createReducer } from '@reduxjs/toolkit';
import { PriceRangeProps } from '../../types/price-range-type';
import { ProductProps } from '../../types/product-type';
import {
  setGuitars, setSearchedGuitars, setPriceRangeAcoustic, setPriceRangeElectric,
  setPriceRangeUkulele, setPriceRangeAll, setComments
} from '../actions';

export type InitialStateAppProps = {
  guitars: ProductProps[];
  searchedGuitars: ProductProps[];
  priceRangeAcoustic: PriceRangeProps;
  priceRangeElectric: PriceRangeProps;
  priceRangeUkulele: PriceRangeProps;
  priceRangeAll: PriceRangeProps;
  comments: string[];
};

export const initialStateApp: InitialStateAppProps = {
  guitars: [],
  searchedGuitars: [],
  priceRangeAcoustic: {
    min: '',
    max: '',
  },
  priceRangeElectric: {
    min: '',
    max: '',
  },
  priceRangeUkulele: {
    min: '',
    max: '',
  },
  priceRangeAll: {
    min: '',
    max: '',
  },
  comments: [],
};

export const appReducer = createReducer(initialStateApp, (builder) => {
  builder
    .addCase(setGuitars, (state, { payload, }) => {
      state.guitars = payload;
    })
    .addCase(setSearchedGuitars, (state, { payload, }) => {
      state.searchedGuitars = payload;
    })
    .addCase(setPriceRangeAcoustic, (state, { payload, }) => {
      state.priceRangeAcoustic = payload;
    })
    .addCase(setPriceRangeElectric, (state, { payload, }) => {
      state.priceRangeElectric = payload;
    })
    .addCase(setPriceRangeUkulele, (state, { payload, }) => {
      state.priceRangeUkulele = payload;
    })
    .addCase(setPriceRangeAll, (state, { payload, }) => {
      state.priceRangeAll = payload;
    })
    .addCase(setComments, (state, { payload, }) => {
      state.comments.push(payload);
    });
});
