import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])

   const addToCart = (item) => {
    const isItemInCart = cart.find((cartItem) => cartItem.menuItem.id === item.menuItem.id);

    if (isItemInCart) {
      setCart(
        cart.map((cartItem) =>
          cartItem.menuItem.id === item.menuItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cart.find((cartItem) => cartItem.menuItem.id === item.menuItem.id);

    if (isItemInCart.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.menuItem.id !== item.menuItem.id));
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.menuItem.id === item.menuItem.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };


  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  };

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



   return (
     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
     </CartContext.Provider>
   );
}

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
