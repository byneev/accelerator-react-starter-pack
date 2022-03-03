import { createReducer } from '@reduxjs/toolkit';
import { FilterProps } from '../../types/filter-type';
import { ProductProps } from '../../types/product-type';
import { PRODUCTS_LIMIT_ON_PAGE, SortType } from '../../utils/const';
import {
  setCurrentFilters, setCurrentSort, setStartRange,
  setSearchQuery, setTotalCount, setCurrentPage, setCurrentQuery, setSearchInput, addToCartGuitars, removeFromCartGuitars, setCartProduct
} from '../actions';

export type InitialStateUserProps = {
  currentSort: [SortType, SortType];
  currentFilters: FilterProps;
  searchQuery: string;
  startRange: number;
  totalCount: number;
  currentPage: string;
  currentQuery: string;
  searchInput: string;
  cartGuitars: ProductProps[];
  cartProduct: ProductProps | null;
};

export const initialStateUser: InitialStateUserProps = {
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
  searchInput: '',
  cartGuitars: [],
  cartProduct: null,
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
    })
    .addCase(setSearchInput, (state, { payload, }) => {
      state.searchInput = payload;
    })
    .addCase(addToCartGuitars, (state, { payload, }) => {
      if (!state.cartGuitars.includes(payload)) {
        state.cartGuitars.push(payload);
      }
    })
    .addCase(removeFromCartGuitars, (state, { payload, }) => {
      const index = state.cartGuitars.indexOf(payload);
      if (index !== -1) {
        state.cartGuitars = [...state.cartGuitars.slice(0, index), ...state.cartGuitars.slice(index)];
      }
    })
    .addCase(setCartProduct, (state, { payload, }) => {
      state.cartProduct = payload;
    });
});
