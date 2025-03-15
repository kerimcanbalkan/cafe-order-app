import api from "./axios";

export const login = async ({ username, password }) => {
  const response = await api.post("/user/login", { username, password });

  if (response.data.token && response.data.expiresIn) {
    const expirationTime = new Date().getTime() + response.data.expiresIn * 1000; // expiresIn is in seconds
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("tokenExpiration", expirationTime.toString());
  }

  return response.data;
};

export const isTokenExpired = () => {
  const expirationTime = localStorage.getItem("tokenExpiration");
  if (!expirationTime) return true;  // No token, consider expired
  return new Date().getTime() > parseInt(expirationTime);  // If current time is greater than expiration time
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiration");
  // Redirect to login page or show a message
  window.location.href = "/login";
};
