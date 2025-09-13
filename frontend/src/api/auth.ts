import api from "./api";

export const signup = (data: {
  fullName: string;
  email?: string;
  phoneNumber?: string;
  password: string;
}) => api.post("/auth/signup", data);
