import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, BeverageSize, Beverage } from '@/types/beverage';
import { RootState } from '../store';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        beverage: Beverage;
        size: BeverageSize;
        quantity: number;
      }>
    ) => {
      const { beverage, size, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.beverageId === beverage.id && item.sizeId === size.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        state.items.push({
          beverageId: beverage.id,
          sizeId: size.id,
          quantity,
          name: beverage.name,
          sizeName: size.name,
          price: size.price,
        });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ beverageId: string; sizeId: string; quantity: number }>
    ) => {
      const { beverageId, sizeId, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.beverageId === beverageId && item.sizeId === sizeId
      );

      if (existingItemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          state.items.splice(existingItemIndex, 1);
        } else {
          // Update quantity
          state.items[existingItemIndex].quantity = quantity;
        }
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ beverageId: string; sizeId: string }>
    ) => {
      const { beverageId, sizeId } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.beverageId === beverageId && item.sizeId === sizeId)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Actions
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemsCount = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
);

export default cartSlice.reducer;