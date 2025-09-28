import api from "./api";

export const signupApi = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const loginApi = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
