import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to create a new Axios instance with auth when needed
export const authApi = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

export default api;
