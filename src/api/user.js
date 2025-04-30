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

// Requires admin
export const createUser = async ({token, user}) => {
  if (!token) {
    throw new Error("No auth token provided");
  }

  console.log("Sending request with this data", user);

  const response = await api.post("/user", user, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Requires admin
export const deleteUser = async ({token, id}) => {
  if (!token) {
    throw new Error("No auth token provided");
  }

  const response = await api.delete(`/user/${id}`, {
    headers: {
       Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
