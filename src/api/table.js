import api from "./axios";

export const getTableByID = async (tableId) => {
  const response = await api.get(`/table/${tableId}`);
  return response.data;
}
