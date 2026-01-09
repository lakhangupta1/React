import axios from "axios";
// import ForgotPassword from "../features/auth/ForgotPassword";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// user Api with axios 
const userApi = {
  getUsers: () => axiosClient.get("/users"),
  addUser: (userData) => axiosClient.post("/users", userData),
  deleteUser: (userId) => axiosClient.delete(`/users/${userId}`),
  updateUser: (userId, userData) => axiosClient.put(`/users/${userId}`, userData),
};

const authApi = {
  login: (credentials) => axiosClient.post("/auth/login", credentials),
  register: (userInfo) => axiosClient.post("/auth/register", userInfo),
  forgotPassword: (userData) => axiosClient.post("/auth/forgotpassword",  userData ),
};

export { userApi, authApi };

export default axiosClient;
