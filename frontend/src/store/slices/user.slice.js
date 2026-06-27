import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../thunks/user.thunk";


const initialState = {
  user: null,
  isAuthenticated: false,
  authChecked: false,

  registerLoading: false,
  loginLoading: false,
  logoutLoading: false,
  currentUserLoading: false,

  error: null,
  successMessage: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },

    clearUserSuccessMessage: (state) => {
      state.successMessage = null;
    },

    clearUserState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /***************** REGISTER *****************/

      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.authChecked = true;

        state.user = action.payload.user || null;
        state.isAuthenticated = Boolean(action.payload.user);

        state.successMessage =
          action.payload.message || "Registered successfully";
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload;
      })
      /********************************************/



      /****************** LOGIN *******************/

      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;

        state.user = action.payload.user || null;
        state.isAuthenticated = Boolean(action.payload.user);
        state.authChecked = true;

        state.successMessage =
          action.payload.message || "Logged in successfully";
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      /********************************************/



      /************* GET CURRENT USER *************/

      .addCase(getCurrentUser.pending, (state) => {
        state.currentUserLoading = true;
        state.error = null;
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUserLoading = false;
        state.authChecked = true;

        state.user = action.payload.user;
        state.isAuthenticated = true;
      
        state.error = null;
      })
      
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.currentUserLoading = false;
        state.authChecked = true;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      /********************************************/



      /****************** LOGOUT ******************/

      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.logoutLoading = false;

        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;

        state.successMessage =
          action.payload.message || "Logged out successfully";
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.error = action.payload;
      });
      /********************************************/
  },
});


export const { clearUserError, clearUserSuccessMessage, clearUserState } =
  userSlice.actions;

export default userSlice.reducer;