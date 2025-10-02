import api from "./api";
import toast from "react-hot-toast";

export const fetchUserBusiness = async () => {
  try {
    const { data } = await api.get("/business/");
    return data;
  } catch (error) {
    toast.error("Failed to fetch business details of current user!");
    return {
      data: [],
    };
  }
};

export const createBusinessApi = async (data) => {
  try {
    const res = await api.post("/business/create", data, "multipart-form");
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create business");
  }
};
