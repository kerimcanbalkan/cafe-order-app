import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  }

  const removeFromCart = (itemId) => {
  setCart((prevCart) => {
    // Find the index of the first item with the matching id
    const index = prevCart.findIndex(item => item.id === itemId);
    
    // If the item is found, remove it
    if (index !== -1) {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1); // Remove one item at the found index
      return updatedCart;
    }
    
    return prevCart;
  });
  };

  const clearCart = () => {
    setCart([]);
  };

   return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
     </CartContext.Provider>
   );
}

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
