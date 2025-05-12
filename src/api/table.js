import api from "./axios";
import { authApi } from "./axios";

export const getTableByID = async (tableId) => {
  const response = await api.get(`/table/${tableId}`);
  return response.data;
}

export const getTables = async () => {
  const response = await authApi().get("/table", {
    headers: {
      'Cache-Control': 'no-cache',
    }
  });

  return response.data;
}

export const createTable = async (table) => {
  const response = await authApi().post("/table",table, {
    headers: {
      "Content-Type": "application/json",
    }
  });

  return response.data;
}

export const deleteTableById = async (tableID) => {
  const response = await authApi().delete(`/table/${tableID}`);

  return response.data;
}
