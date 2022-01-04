import { createReducer } from '@reduxjs/toolkit';
import { FilterProps } from '../types/filter-type';
import { ProductProps } from '../types/product-type';
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE, SortType } from '../utils/const';
import { setCurrentFilters, setCurrentSort, setGuitars, setIsFilterDefault, setPriceMax, setPriceMin, setSearchedGuitars, setSearchQuery } from './actions';

export type InitialStateProps = {
  isFilterDefault: boolean,
  guitars: ProductProps[];
  currentSort: [SortType, SortType];
  currentFilters: FilterProps;
  minPrice: string;
  maxPrice: string;
  searchQuery: string;
  searchedGuitars: ProductProps[];
};

export const initialState: InitialStateProps = {
  isFilterDefault: true,
  guitars: [],
  currentSort: [SortType.Price, SortType.Default],
  currentFilters: {
    priceMin: '',
    priceMax: '',
    stringsCount: {
      isFour: false,
      isSix: false,
      isSeven: false,
      isTwelve: false,
    },
    guitarType: {
      isAcustic: false,
      isElectro: false,
      isUkulele: false,
    },
  },
  minPrice: '',
  maxPrice: '',
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
    })
    .addCase(setIsFilterDefault, (state, { payload, }) => {
      state.isFilterDefault = payload;
    })
    .addCase(setPriceMin, (state, { payload, }) => {
      state.minPrice = payload;
    })
    .addCase(setPriceMax, (state, { payload, }) => {
      state.maxPrice = payload;
    });
});

export type RootProps = ReturnType<typeof RootReducer>;
