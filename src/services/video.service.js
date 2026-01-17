import axiosInstance from "../api/axios.config";

export const videoAPI = {
  getAllVideos: async (page = 1, limit = 10) => {
    const res = await axiosInstance.get(
      `/videos?page=${page}&limit=${limit}`
    );
    return res.data.data;
  },

  getVideoById: async (videoId) => {
    const res = await axiosInstance.get(`/videos/${videoId}`);
    return res.data.data;
  },

  incrementViews: async (videoId) => {
    await axiosInstance.post(`/videos/${videoId}/views`);
  },
};
