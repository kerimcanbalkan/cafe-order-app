import { createContext, useState, useContext, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : []);

  const addToOrder = (items) => {
    setOrder((prevOrder) => {
      // Create a new order array to avoid mutating the previous state
      const updatedOrder = [...prevOrder];

      // Iterate through each item in the passed array
      items.forEach((item) => {
        const isItemInOrder = updatedOrder.find((orderItem) => orderItem.menuItem.id === item.menuItem.id);

        if (isItemInOrder) {
          // If the item already exists, update its quantity
          updatedOrder.forEach((orderItem) => {
            if (orderItem.menuItem.id === item.menuItem.id) {
              orderItem.quantity += item.quantity;
            }
          });
        } else {
          // If the item doesn't exist, add it to the order
          updatedOrder.push(item);
        }
      });

      return updatedOrder;
    });
  };

  const clearOrder = () => {
    setOrder([]);
  };

  const getOrderTotal = () => {
    const total =  order.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
    return Math.trunc(total*100)/100;
  };

  useEffect(() => {
    const localOrder = localStorage.getItem("order");
    if (localOrder) {
      setOrder(JSON.parse(localOrder));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);



   return (
     <OrderContext.Provider value={{ order, addToOrder, clearOrder, getOrderTotal }}>
      {children}
     </OrderContext.Provider>
   );
}

// Custom hook to use the cart context
export const useOrder = () => useContext(OrderContext);
