import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { beverageApi } from './services/beverageApi';
import { orderApi } from './services/orderApi';
import cartReducer from './slices/cartSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    [beverageApi.reducerPath]: beverageApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(beverageApi.middleware, orderApi.middleware),
});

// Enable refetching on focus
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;