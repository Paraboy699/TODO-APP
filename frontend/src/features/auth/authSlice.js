import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null, // Initial user state from localStorage
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register the user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    // Renamed the argument to userData
    try {
      const response = await authService.register(userData);
      return response.data; // Assuming response is an object containing user data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      // Reset the state
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        // Update the state while registration is in progress
        state.isLoading = true;
        state.isSuccess = false; // Resetting success state
        state.isError = false; // Resetting error state
        state.message = ""; // Resetting error message
      })
      .addCase(register.fulfilled, (state, action) => {
        // Update the state after successful registration
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        // Update the state if registration fails
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        // Update the state after successful logout
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
