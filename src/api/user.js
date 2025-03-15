import api from "./axios";

export const getUserMe = async (token) => {
  if (!token) return;
  
  const response = await api.get("/user/me", {
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
    });
  return response.data.data;
};

