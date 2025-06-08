import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UiState {
  theme: 'light' | 'dark';
}

const initialState: UiState = {
  theme: 'light',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

// Actions
export const {
  toggleTheme,
} = uiSlice.actions;

// Selectors
export const selectTheme = (state: RootState) => state.ui.theme;

export default uiSlice.reducer;