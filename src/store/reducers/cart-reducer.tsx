import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const cartReducer = createSlice({
  name: 'cart',
  initialState: 0,
  reducers: {
    incrementCartSum: (state, action: PayloadAction<number>) => state + action.payload,
    decrementCartSum: (state, action: PayloadAction<number>) => state - action.payload,
    resetCartSum: (state) => state = 0,
    setCartSum: (state, action: PayloadAction<number>) => state = action.payload,
  },
});

export const { incrementCartSum, decrementCartSum, resetCartSum, } = cartReducer.actions;
