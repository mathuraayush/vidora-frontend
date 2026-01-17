import axiosInstance from "../api/axios.config";

export const historyAPI = {
  addToHistory: async (videoId) => {
    await axiosInstance.post(`/watch-history/${videoId}`);
  },

  getHistory: async () => {
    const res = await axiosInstance.get(`/watch-history`);
    return res.data.data;
  },
};
