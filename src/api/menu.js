import api from "./axios";

export const fetchMenu = async () => {
  const response = await api.get("/menu");
  return response.data;
};
