import api, { authApi } from "./axios";

export const fetchMenu = async () => {
  const response = await api.get("/menu", {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  return response.data;
};

export const deleteMenuItem = async (id) => {
  const response = await authApi().delete(`/menu/${id}`);
  return response.data;
}

export const addMenuItem = async (menuItem) => {
  const response = await authApi().post("/menu", menuItem, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

