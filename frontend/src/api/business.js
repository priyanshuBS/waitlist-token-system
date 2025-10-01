import api from "./api";
import toast from "react-hot-toast";

export const fetchUserBusiness = async () => {
  try {
    const { data } = await api.get("/business/");
    // console.log(data);
    return data;
  } catch (error) {
    toast.error("Failed to fetch business details of current user!");
    return {
      data: [],
    };
  }
};
