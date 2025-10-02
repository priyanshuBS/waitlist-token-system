import api from "./api";
import toast from "react-hot-toast";

export const fetchUserBusiness = async () => {
  try {
    const res = await api.get("/business");
    return res?.data?.data;
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

export const popularBusinessApi = async () => {
  try {
    const res = await api.get("/business/popular");
    return res.data.data;
  } catch (error) {
    toast.error("Failed to get popular business data!");
    return [];
  }
};

export const nearbyBusinessApi = async () => {
  try {
    const res = await api.get("/business/nearby");
    return res?.data.data;
  } catch (error) {
    toast.error("Failed to get near by business data!");
    return [];
  }
};

export const getBusinessByIdApi = async (id) => {
  try {
    const res = await api.get(`/business/${id}`);
    console.log(res?.data);
    return res?.data?.data;
  } catch (error) {
    return [];
  }
};
