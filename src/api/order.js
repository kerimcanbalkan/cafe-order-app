import api from "./axios";

/**
 * Sends an order to the API.
 * @param {Object} params - The order details.
 * @param {Array} params.cart - The list of items in the order.
 * @param {string} params.tableNumber - The table number for the order.
 * @returns {Promise<Object>} The response data from the API.
 */
export const postOrder = async ({cart, tableID}) => {
  const response = await api.post(`/order/${tableID}`, {items: cart});
  return response.data;
}

/**
 * Retrieves the active order for a specific table.
 * @param {number|string} tableNumber - The table number to fetch the active order for.
 * @returns {Promise<Object|null>} The active order data or null if not found.
 */
export const getActiveOrder = async (tableID) => {
  const response = await api.get(`order/active/${tableID}`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  return response.data;
}

/**
 * Retrieves the all orders placed for every date
 * @param {number|string} tableNumber - The table number to fetch the active order for.
 * @returns {Promise<Object|null>} The active order data or null if not found.
 */
export const getOrders = async ({token}) => {
  if (!token) {
    throw new Error("No auth token provided");
  }
  
  const response = await api.get("order", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
