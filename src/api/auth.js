import api from "./axios";

export const loginCall = async ({ username, password }) => {
  const response = await api.post("/user/login", { username, password });
  
  return response.data;
};
