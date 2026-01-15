import axiosInstance from './axios.config';

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const formData = new FormData();
    formData.append('fullName', userData.fullName);
    formData.append('email', userData.email);
    formData.append('username', userData.username);
    formData.append('password', userData.password);
    
    if (userData.avatar) {
      formData.append('avatar', userData.avatar);
    }
    
    if (userData.coverImage) {
      formData.append('coverImage', userData.coverImage);
    }

    const response = await axiosInstance.post('/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await axiosInstance.post('/users/login', credentials);
    if (response.data.data.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await axiosInstance.post('/users/logout');
    localStorage.removeItem('accessToken');
    return response.data;
  },

  // Refresh access token
  refreshToken: async () => {
    const response = await axiosInstance.post('/users/refreshAccessToken');
    if (response.data.data.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/users/getcurrentUser');
    return response.data;
  },
};