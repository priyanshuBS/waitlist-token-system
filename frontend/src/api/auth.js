import api from "./api";

export const signupApi = (data) => {
  return api.post("/user/signup", data);
};

export const loginApi = (data) => {
  return api.post("/user/login", data);
};

export const logoutApi = () => {
  return api.post("/user/logout");
};

export const googleApi = (token) => {
  return api.get("/user/google/callback", { token });
};
