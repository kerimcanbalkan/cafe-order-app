import api, { authApi } from "./axios";

/**
 * Retrieves order statistics for a given time period
 * @param {Object} params - Function parameters
 * @param {string} params.from - Date in YYYY-MM-DD format
 * @param {string} params.to - Date in YYYY-MM-DD format
 * @param {string} params.groupBy - Groupby should be one of "day", "week" or "month"
 */
export const getOrderStatistics = async ({from, to, groupBy}) => {
  
  const response = await authApi().get(`order/stats?from=${from}&to=${to}&group_by=${groupBy}`,
    {
      headers: {
        'Cache-Control': 'no-cache',
        "Content-Type": "application/json",
      }
    });
  return response.data;
}

/**
 * Retrieves employee statistics for a given id and time period
 * @param {Object} params - Function parameters
 * @param {string} params.id - Employee ID
 * @param {string} params.from - Date in YYYY-MM-DD format
 * @param {string} params.to - Date in YYYY-MM-DD format
 * @param {string} params.groupBy - Group by should be one of "day", "week" or "month"
 */
export const getEmployeeStatistics = async ({id, from, to, groupBy}) => {
  const response = await authApi().get(`user/${id}/stats?from=${from}&to=${to}&group_by=${groupBy}`,
    {
      headers: {
        'Cache-Control': 'no-cache',
        "Content-Type": "application/json",
      }
    });
  return response.data;
}
