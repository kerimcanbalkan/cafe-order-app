import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getActiveOrder } from "../api/order";
import { useParams } from "react-router-dom";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { tableNumber } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Fetch active order from database
  const { data: order = [], refetch } = useQuery({
    queryKey: ["order", tableNumber],
    queryFn: async () => {
      const response = await getActiveOrder(tableNumber);
      
      let calculatedTotalPrice = 0;
      const transformedOrder = response.data?.length > 0
        ? response.data.reduce((acc, order) => {
            calculatedTotalPrice += order.totalPrice;
            order.items.forEach((item) => {
              const existingItem = acc.find((i) => i.menuItem.id === item.menuItem.id);
              if (existingItem) {
                existingItem.quantity += item.quantity;
              } else {
                acc.push({ ...item });
              }
            });
            return acc;
          }, [])
        : [];
      
      // Set totalPrice after calculation
      setTotalPrice(calculatedTotalPrice);

      return transformedOrder;
    },
  });

  const getOrderTotal = () => {
    return Math.trunc(totalPrice * 100) / 100;
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        refetchOrder: refetch,
        getOrderTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
