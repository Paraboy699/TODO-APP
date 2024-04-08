import { createSlice } from "@reduxjs/toolkit";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null, // Using nullish coalescing operator for better readability
  isError: null,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Add extra reducers here if needed
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer; // Changed from `.reducers` to `.reducer` for correct export
