import api from "./axios";

export const fetchMenu = async () => {
  const response = await api.get("/menu", {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  return response.data;
};

export const deleteMenuItem = async ({token, id}) => {
  if (!token) {
    throw new Error("No auth token provided");
  }

  const response = await api.delete(`/menu/${id}`, {
    headers: {
       Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const addMenuItem = async ({ token, menuItem }) => {
  if (!token) {
    throw new Error("No auth token provided");
  }

  const response = await api.post("/menu", menuItem, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

