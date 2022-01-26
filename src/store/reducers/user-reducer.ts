import { createReducer } from '@reduxjs/toolkit';
import { FilterProps } from '../../types/filter-type';
import { PRODUCTS_LIMIT_ON_PAGE, SortType } from '../../utils/const';
import {
  setCurrentFilters, setCurrentSort, setIsFilterDefault, setStartRange,
  setSearchQuery, setTotalCount, setCurrentPage, setCurrentQuery
} from '../actions';

export type InitialStateUserProps = {
  isFilterDefault: boolean,
  currentSort: [SortType, SortType];
  currentFilters: FilterProps;
  searchQuery: string;
  startRange: number;
  totalCount: number;
  currentPage: string;
  currentQuery: string;
};

export const initialStateUser: InitialStateUserProps = {
  isFilterDefault: true,
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
  startRange: 0,
  totalCount: PRODUCTS_LIMIT_ON_PAGE,
  currentPage: '1',
  currentQuery: '',
};

export const userReducer = createReducer(initialStateUser, (builder) => {
  builder
    .addCase(setCurrentSort, (state, { payload, }) => {
      state.currentSort = payload;
    })
    .addCase(setCurrentFilters, (state, { payload, }) => {
      state.currentFilters = payload;
    })
    .addCase(setSearchQuery, (state, { payload, }) => {
      state.searchQuery = payload;
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
    .addCase(setCurrentPage, (state, { payload, }) => {
      state.currentPage = payload;
    })
    .addCase(setCurrentQuery, (state, { payload, }) => {
      state.currentQuery = payload;
    });
});
