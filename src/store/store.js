import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';
import productsReducer from '../features/shop/productsSlice';
import cartReducer from '../features/shop/cartSlice';

export const store = configureStore({
  reducer: {
    users : userReducer,
    auth : authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});