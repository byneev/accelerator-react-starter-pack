/* eslint-disable no-console */
import { createReducer, current } from '@reduxjs/toolkit';
import { FilterProps } from '../../types/filter-type';
import { ProductProps } from '../../types/product-type';
import { PRODUCTS_LIMIT_ON_PAGE, SortType } from '../../utils/const';
import {
  setCurrentFilters, setCurrentSort, setStartRange,
  setSearchQuery, setTotalCount, setCurrentPage, setCurrentQuery, setSearchInput, addToCartGuitars, removeFromCartGuitars, setCartProduct, removeFullCountGuitarFromCart, setCurrentSale
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
  cartGuitars: [ProductProps, number][];
  cartProduct: ProductProps | null;
  currentSale: number,
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
  currentSale: 0,
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
      if (!current(state.cartGuitars).some((item: [ProductProps, number]) => item[0].id === payload.id)) {
        state.cartGuitars.push([payload, 1]);
      } else {
        const guitars = current(state.cartGuitars).filter((item: [ProductProps, number]) => item[0].id === payload.id);
        const [guitar, count] = guitars[0];
        const newGuitars = current(state.cartGuitars).filter((item: [ProductProps, number]) => item[0].id !== payload.id);
        newGuitars.push([guitar, count + 1]);
        state.cartGuitars = newGuitars;
      }
    })
    .addCase(removeFromCartGuitars, (state, { payload, }) => {
      const guitars = current(state.cartGuitars).filter((item: [ProductProps, number]) => item[0].id === payload.id);
      if (guitars[0]) {
        const [guitar, count] = guitars[0];
        if (count === 1) {
          state.cartGuitars = current(state.cartGuitars).filter((item: [ProductProps, number]) => item[0].id !== payload.id);
        } else {
          const newGuitars = current(state.cartGuitars).filter((item: [ProductProps, number]) => item[0].id !== payload.id);
          newGuitars.push([guitar, count - 1]);
          state.cartGuitars = newGuitars;
        }
      }
    })
    .addCase(setCartProduct, (state, { payload, }) => {
      state.cartProduct = payload;
    })
    .addCase(removeFullCountGuitarFromCart, (state, { payload, }) => {
      state.cartGuitars = current(state.cartGuitars).filter((item: [ProductProps, number]) => item[0].id !== payload.id);
    })
    .addCase(setCurrentSale, (state, { payload, }) => {
      state.currentSale = payload;
    });
});
