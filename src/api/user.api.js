import axiosInstance from './axios.config';

export const userAPI = {
  // Update account details
  updateAccount: async (data) => {
    const response = await axiosInstance.patch('/users/updateAcoountDetails', data);
    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    const response = await axiosInstance.post('/users/changeCurrentPassword', data);
    return response.data;
  },

  // Update avatar
  updateAvatar: async (avatarFile) => {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const response = await axiosInstance.patch('/users/updateUserAvatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update cover image
  updateCoverImage: async (coverImageFile) => {
    const formData = new FormData();
    formData.append('coverImage', coverImageFile);

    const response = await axiosInstance.patch('/users/updateUserCoverImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get channel profile
  getChannelProfile: async (username) => {
    const response = await axiosInstance.get(`/users/c/${username}`);
    return response.data;
  },

  // Get watch history
  getWatchHistory: async () => {
    const response = await axiosInstance.get('/users/history');
    return response.data;
  },
};