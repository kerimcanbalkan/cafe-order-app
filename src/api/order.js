import api from "./axios";

/**
 * Sends an order to the API.
 * @param {Object} params - The order details.
 * @param {Array} params.cart - The list of items in the order.
 * @param {number|string} params.tableNumber - The table number for the order.
 * @returns {Promise<Object>} The response data from the API.
 */
export const postOrder = async ({cart, tableNumber}) => {
  const response = await api.post(`/order/${tableNumber}`, {items: cart});
  return response.data;
}

/**
 * Retrieves the active order for a specific table.
 * @param {number|string} tableNumber - The table number to fetch the active order for.
 * @returns {Promise<Object|null>} The active order data or null if not found.
 */
export const getActiveOrder = async (tableNumber) => {
  const response = await api.get(`order?table=${tableNumber}&closed=false`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  return response.data;
}
