import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No auth token provided");
  }
  
  return axios.create({
    baseURL: "/api/v1/",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

export default api;
