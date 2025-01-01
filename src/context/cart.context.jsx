import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, addingProduct) => {
  //find if cartItem contains addingProduct
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === addingProduct.id,
  );

  // if it does, increment the quantity of that cartItem
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === addingProduct.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }
  // return a new array with modified cartItems / new cart item array
  return [...cartItems, { ...addingProduct, quantity: 1 }];
};

const removeCartItem = (cartItems, removeItemFromCart) => {
  // find item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === removeItemFromCart.id,
  );
  // check if quantity is equal to 1, remove the item
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== removeItemFromCart.id,
    );
  }
  // return back cart items with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === removeItemFromCart.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_OPEN_CART: "SET_OPEN_CART",
};

const INITIAL_CART_STATE = {
  open: false,
  cartItems: [],
  cartCount: 0,
  cartTotalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_OPEN_CART:
      return { ...state, open: payload };
    default:
      throw new Error(`Unhandled action type: ${type} in cartReducer`);
  }
};

const clearCartItem = (cartItems, clearItemFromCart) =>
  cartItems.filter((cartItem) => cartItem.id !== clearItemFromCart.id);

export const CartContext = createContext({
  open: false,
  toggleCart: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartCount, cartTotalPrice, open }, dispatch] = useReducer(
    cartReducer,
    INITIAL_CART_STATE,
  );

  const handleSetItemToCart = (cartItems) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => (total += cartItem.quantity),
      0,
    );
    const newCartTotalPrice = cartItems.reduce(
      (total, cartItem) => (total += cartItem.quantity * cartItem.price),
      0,
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems,
        cartCount: newCartCount,
        cartTotalPrice: newCartTotalPrice,
      }),
    );
  };

  const addItemToCart = (itemToAdd) => {
    const newCartItems = addCartItem(cartItems, itemToAdd);
    handleSetItemToCart(newCartItems);
  };

  const removeItemFromCart = (itemToRemove) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove);
    handleSetItemToCart(newCartItems);
  };

  const clearItemFromCart = (itemToClear) => {
    const newCartItems = clearCartItem(cartItems, itemToClear);
    handleSetItemToCart(newCartItems);
  };

  const setOpenCartItem = () => {
    dispatch(createAction(CART_ACTION_TYPES.SET_OPEN_CART, !open));
  };

  const value = {
    open,
    toggleCart: setOpenCartItem,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
