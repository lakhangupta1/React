import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await productApi.getAll();
});

export const createProduct = createAsyncThunk('products/createProduct', async (payload) => {
  return await productApi.create(payload);
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, payload }) => {
  return await productApi.update(id, payload);
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  return await productApi.remove(id);
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload.id);
      });
  },
});

export default productsSlice.reducer;
