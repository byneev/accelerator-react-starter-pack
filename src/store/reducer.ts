import { createReducer } from '@reduxjs/toolkit';
import { FilterProps } from '../types/filter-type';
import { ProductProps } from '../types/product-type';
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE, SortType } from '../utils/const';
import { setCurrentFilters, setCurrentSort, setGuitars, setSearchedGuitars, setSearchQuery } from './actions';

export type InitialStateProps = {
  guitars: ProductProps[];
  currentSort: [SortType, SortType];
  currentFilters: FilterProps;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  searchedGuitars: ProductProps[];
};

export const initialState: InitialStateProps = {
  guitars: [],
  currentSort: [SortType.Price, SortType.Default],
  currentFilters: {
    priceMin: DEFAULT_MIN_PRICE,
    priceMax: DEFAULT_MAX_PRICE,
    stringsCount: null,
    guitarType: null,
  },
  minPrice: DEFAULT_MIN_PRICE,
  maxPrice: DEFAULT_MAX_PRICE,
  searchQuery: '',
  searchedGuitars: [],
};

export const RootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitars, (state, { payload, }) => {
      state.guitars = payload;
    })
    .addCase(setCurrentSort, (state, { payload, }) => {
      state.currentSort = payload;
    })
    .addCase(setCurrentFilters, (state, { payload, }) => {
      state.currentFilters = payload;
    })
    .addCase(setSearchQuery, (state, { payload, }) => {
      state.searchQuery = payload;
    })
    .addCase(setSearchedGuitars, (state, { payload, }) => {
      state.searchedGuitars = payload;
    });
});

export type RootProps = ReturnType<typeof RootReducer>;
