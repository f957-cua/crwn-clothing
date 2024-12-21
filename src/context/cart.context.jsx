import { useState, createContext } from "react";

export const CartContext = createContext({
  open: false,
  toggleCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const value = {
    open,
    toggleCart: () => setOpen(!open),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
