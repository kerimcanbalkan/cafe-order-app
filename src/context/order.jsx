import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getActiveOrder } from "../api/order";
import { useParams } from "react-router-dom";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { tableNumber } = useParams();
  
  // Fetch active order from database
  const { data: order = [], refetch } = useQuery({
    queryKey: ["order", tableNumber],
    queryFn: async () => {
      const response = await getActiveOrder(tableNumber);
      return response?.data || [];
    },
  });

  const getOrderTotal = () => {
    return Math.trunc(order.reduce((acc,item) => acc +item.totalPrice, 0) * 100) / 100;
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
