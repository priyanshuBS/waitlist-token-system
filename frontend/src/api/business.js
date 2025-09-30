import api from "./api";

export const fetchUserBusiness = async () => {
  try {
    const res = await api.get("/business/info");
    return res?.data;
  } catch (error) {
    console.log("Error fetching data!");
    return [];
  }
};
