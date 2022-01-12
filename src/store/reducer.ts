import { createReducer } from '@reduxjs/toolkit';
import { FilterProps } from '../types/filter-type';
import { PaginationProps } from '../types/pagination-type';
import { ProductProps } from '../types/product-type';
import { SortType } from '../utils/const';
import { setCurrentFilters, setCurrentSort, setGuitars, setIsFilterDefault, setPaginationData, setPriceMax, setPriceMin, setSearchedGuitars, setSearchQuery } from './actions';

export type InitialStateProps = {
  isFilterDefault: boolean,
  guitars: ProductProps[];
  currentSort: [SortType, SortType];
  currentFilters: FilterProps;
  minPrice: string;
  maxPrice: string;
  searchQuery: string;
  searchedGuitars: ProductProps[];
  paginationData: PaginationProps;
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
  paginationData: {
    startRange: 0,
    totalCount: 9,
  },
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
    })
    .addCase(setPaginationData, (state, { payload, }) => {
      state.paginationData = payload;
    });
});

export type RootProps = ReturnType<typeof RootReducer>;
