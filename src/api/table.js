import api from "./axios";

export const getTableByID = async (tableId) => {
  const response = await api.get(`/table/${tableId}`);
  return response.data;
}

export const getTables = async ({token}) => {
  if (!token) {
    throw new Error("No auth token provided");
  }
  
  const response = await api.get("/table", {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    }
  });

  return response.data;
}
