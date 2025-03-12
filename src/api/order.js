import api from "./axios";

export const postOrder = async ({cart, tableNumber}) => {
    console.log("Sending order with cart:", cart, "and tableNumber:", tableNumber);
  const response = await api.post(`/order/${tableNumber}`, {items: cart});
  return response.data;
}
