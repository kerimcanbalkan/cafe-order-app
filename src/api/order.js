import api from "./axios";
import { authApi } from "./axios";

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
 * Retrieves the all orders placed for every date
 * @param {number|string} tableNumber - The table number to fetch the active order for.
 * @returns {Promise<Object|null>} The active order data or null if not found.
 */
export const getOrders = async () => {
  const response = await authApi().get("order",{
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  
  return response.data;
}

/**
 * Retrieves the active order for a specific table.
 * @param {string} tableNumber - The table id to fetch the active order for.
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
 * Retrieves all orders that has not been served yet
 * @param {string} authToken - authentication token
 * @returns {Promise<Object|null>} The active order data or null if not found.
 * requires authentication
 */
export const getOrdersWaiter = async () => {
  const response = await authApi().get(`order?served=false`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  return response.data;
}

/**
 * Sends a patch request to mark order served for a given order id
 * @param {string} id - The order ID
 * @returns {Promise<Object|null>} The active order data or null if not found.
 */
export const serveOrder = async (id) => {
  const response = await authApi().patch(`order/serve/${id}`, null);
  
  return response.data;
}
