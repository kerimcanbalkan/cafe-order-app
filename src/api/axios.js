import axios from "axios";
import { isTokenExpired } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = () => {
  const token = localStorage.getItem("authToken");
  console.log("This is token got from local storage authApi function", token);
  
  if (!token && isTokenExpired()) {
    window.location.href = "/login";
    return null; // Explicitly return null instead of undefined
  }
  
  return axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};


export default api;
