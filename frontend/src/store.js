import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './services/product'
// adjust path

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
})