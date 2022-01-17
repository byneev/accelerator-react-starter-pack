import { createReducer } from '@reduxjs/toolkit';
import { FilterProps } from '../types/filter-type';
import { PriceRangeProps } from '../types/price-range-type';
import { ProductProps } from '../types/product-type';
import { SortType } from '../utils/const';
import { setCurrentFilters, setCurrentSort, setGuitars, setIsFilterDefault, setStartRange, setSearchedGuitars, setSearchQuery, setTotalCount, setPriceRangeAcoustic, setPriceRangeElectric, setPriceRangeUkulele, setPriceRangeAll, setCurrentPage } from './actions';

export type InitialStateProps = {
  isFilterDefault: boolean,
  guitars: ProductProps[];
  currentSort: [SortType, SortType];
  currentFilters: FilterProps;
  searchQuery: string;
  searchedGuitars: ProductProps[];
  startRange: number;
  totalCount: number;
  priceRangeAcoustic: PriceRangeProps;
  priceRangeElectric: PriceRangeProps;
  priceRangeUkulele: PriceRangeProps;
  priceRangeAll: PriceRangeProps;
  currentPage: string;
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
  searchQuery: '',
  searchedGuitars: [],
  startRange: 0,
  totalCount: 1000,
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
  currentPage: '1',
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
    .addCase(setStartRange, (state, { payload, }) => {
      state.startRange = payload;
    })
    .addCase(setTotalCount, (state, { payload, }) => {
      state.totalCount = payload;
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
    .addCase(setCurrentPage, (state, { payload, }) => {
      state.currentPage = payload;
    });
});

export type RootProps = ReturnType<typeof RootReducer>;
