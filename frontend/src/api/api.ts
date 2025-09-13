import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://localhost:8000/api",
  withCredentials: true,
});

export default api;
