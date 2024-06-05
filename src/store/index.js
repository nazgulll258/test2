import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
