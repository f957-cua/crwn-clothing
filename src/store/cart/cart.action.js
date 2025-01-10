import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_OPEN_CART, boolean);

export const addItemToCart = (cartItems, itemToAdd) => {
  const newCartItems = addCartItem(cartItems, itemToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, itemToClear) => {
  const newCartItems = clearCartItem(cartItems, itemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
