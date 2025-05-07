import api from "./axios";

/**
 * Retrieves order statistics for a given time period
 * @param {Object} params - Function parameters
 * @param {string} params.from - Date in YYYY-MM-DD format
 * @param {string} params.to - Date in YYYY-MM-DD format
 * @param {string} params.token - Auth token for the api authentication
 */
export const getOrderStatistics = async ({from, to, token}) => {
  if (!token) {
    throw new Error("No auth token provided");
  }
  
  const response = await api.get(`order/stats?from=${from}&to=${to}`,
    {
      headers: {
        'Cache-Control': 'no-cache',
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  return response.data;
}
