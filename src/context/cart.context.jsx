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

export const CartContext = createContext({
  open: false,
  toggleCart: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => (total += cartItem.quantity),
      0,
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (addingProduct) => {
    setCartItems(addCartItem(cartItems, addingProduct));
  };

  const value = {
    open,
    toggleCart: () => setOpen(!open),
    cartItems,
    addItemToCart,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
