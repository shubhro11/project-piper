import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/axios_config";


/***************** REGISTER *****************/

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (registerData, { rejectWithValue }) => {
    try {
      const res = await authApi.post(
        "/register",
        {
          fullName: {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
          },
          email: registerData.email,
          password: registerData.password,
        },
        {
          withCredentials: true,
        },
      );

      return res.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Registration failed",
      );
    }
  },
);
/********************************************/


/*************** GOOGLE SIGNIN ***************/

export const startGoogleAuth = (flow) => {
  return () => {
    window.location.href = `http://localhost:3000/api/auth/google?flow=${flow}`;
  };
};
/*********************************************/


/****************** LOGIN *******************/

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await authApi.post(
        "/login",
        {
          email: loginData.email,
          password: loginData.password,
        },
        {
          withCredentials: true,
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Login failed",
      );
    }
  },
);
/********************************************/


/************* GET CURRENT USER *************/

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.get("/me");

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get current user",
      );
    }
  },
);
/********************************************/


/****************** LOGOUT ******************/

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.post("/logout");

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);
/********************************************/






