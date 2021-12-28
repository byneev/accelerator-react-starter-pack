import { createReducer } from '@reduxjs/toolkit';
import { FilterProps } from '../types/filter-type';
import { ProductProps } from '../types/product-type';
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE, SortType } from '../utils/const';
import { setCurrentFilters, setCurrentSort, setGuitars } from './actions';

export type InitialStateProps = {
  guitars: ProductProps[];
  currentSort: [SortType, SortType];
  currentFilters: FilterProps;
};

export const initialState: InitialStateProps = {
  guitars: [],
  currentSort: [SortType.Default, SortType.Default],
  currentFilters: {
    priceMin: DEFAULT_MIN_PRICE,
    priceMax: DEFAULT_MAX_PRICE,
    stringsCount: null,
    guitarType: null
  },
};

export const RootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitars, (state, { payload }) => {
      state.guitars = payload;
    })
    .addCase(setCurrentSort, (state, { payload }) => {
      state.currentSort = payload;
    })
    .addCase(setCurrentFilters, (state, { payload }) => {
      state.currentFilters = payload;
    });
});

export type RootProps = ReturnType<typeof RootReducer>;
