import api, { authApi } from "./axios";

export const getUserMe = async () => {
  const response = await authApi().get("/user/me", {
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
      },
    });
  return response.data.data;
};

// Requires admin
export const getAllUsers = async () => {
  const response = await authApi().get("/user", {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });

  return response.data;
}

// Requires admin
export const createUser = async (user) => {
  const response = await authApi().post("/user", user, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Requires admin
export const deleteUser = async (id) => {
  const response = await authApi().delete(`/user/${id}`);
  
  return response.data;
}
