import api from "./axios";

export const getUserMe = async (token) => {
  if (!token) {
    throw new Error("No auth token provided");
  }
  
  const response = await api.get("/user/me", {
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
    });
  return response.data.data;
};

// Requires admin
export const getAllUsers = async ({token}) => {
  if (!token) {
    throw new Error("No auth token provided");
  }

  const response = await api.get("/user", {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
