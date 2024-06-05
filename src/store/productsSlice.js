import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  product: {},
  currentProductId: 1,
};

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (productId) => {
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  const data = await response.json();
  return data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementProductId: (state) => {
      state.currentProductId += 1;
    },
    decrementProductId: (state) => {
      if (state.currentProductId > 1) state.currentProductId -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { incrementProductId, decrementProductId } = productsSlice.actions;

export default productsSlice.reducer;