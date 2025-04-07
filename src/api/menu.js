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

  console.log("Sending delete request for "+id+"with token "+token);
  const response = await api.delete(`/menu/${id}`, {
    headers: {
       Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
