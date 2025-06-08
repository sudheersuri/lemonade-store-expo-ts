import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { beverageApi } from '@/redux/services/beverageApi';
import cartReducer from '@/redux/slices/cartSlice';
import uiReducer from '@/redux/slices/uiSlice';
import { orderApi } from '@/redux/services/orderApi';

const rootReducer = combineReducers({
  [beverageApi.reducerPath]: beverageApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  cart: cartReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof createTestStore>;

export const createTestStore = (preloadedState?: any) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(beverageApi.middleware, orderApi.middleware),
    preloadedState,
  });
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Re-export everything from testing library
export * from '@testing-library/react-native';