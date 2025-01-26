import { createSlice } from "@reduxjs/toolkit";

export const CART_INITIAL_STATE = {
  open: false,
  cartItems: [],
};

const addCartItem = (cartItems, addingProduct) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === addingProduct.id,
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === addingProduct.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }
  // console.log(addingProduct, cartItems);
  return [...cartItems, { ...addingProduct, quantity: 1 }];
};

const removeCartItem = (cartItems, removeItemFromCart) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === removeItemFromCart.id,
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== removeItemFromCart.id,
    );
  }
  return cartItems.map((cartItem) =>
    cartItem.id === removeItemFromCart.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

const clearCartItem = (cartItems, clearItemFromCart) =>
  cartItems.filter((cartItem) => cartItem.id !== clearItemFromCart.id);

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    setIsCartOpen(state, action) {
      state.open = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  setIsCartOpen,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
