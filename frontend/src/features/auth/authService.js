import axios from "axios";

const API_URL = "/api/users/";

// Register User
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    // If registration is successful, store user data in localStorage
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout User
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
};

export default authService;
