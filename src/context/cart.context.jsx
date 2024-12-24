import { useState, createContext, useEffect } from "react";

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
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => (total += cartItem.quantity),
      0,
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotalPrice = cartItems.reduce(
      (total, cartItem) => (total += cartItem.quantity * cartItem.price),
      0,
    );
    setCartTotalPrice(newCartTotalPrice);
  }, [cartItems]);

  const addItemToCart = (itemToAdd) => {
    setCartItems(addCartItem(cartItems, itemToAdd));
  };

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeCartItem(cartItems, itemToRemove));
  };

  const clearItemFromCart = (itemToClear) => {
    setCartItems(clearCartItem(cartItems, itemToClear));
  };

  const value = {
    open,
    toggleCart: () => setOpen(!open),
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
