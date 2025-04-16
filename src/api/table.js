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

export const createTable = async ({token, table}) => {
  if (!token) {
    throw new Error("No auth token provided");
  }

  const response = await api.post("/table",table, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

  return response.data;
}

export const deleteTableById = async ({token, tableID}) => {
  if (!token) {
    throw new Error("No auth token provided");
  }

  const response = await api.delete(`/table/${tableID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
}
