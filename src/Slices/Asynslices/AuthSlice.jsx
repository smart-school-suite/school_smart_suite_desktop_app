import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  otpTokenHeader: null,
  apiKey: null,
  schoolId:null,
  schoolBranchId:null,
  passwordResetOtpToken:null,
  passwordResetToken:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleSetUserLogin: (state, action) => {
      state.otpTokenHeader = action.payload.otpTokenHeader;
    },
    handleSetTwoFA: (state, action) => {
      state.token = action.payload.authToken;
      state.apiKey = action.payload.apiKey;
      state.authUser = true;
      state.isAuthenticated = true;
      state.otpTokenHeader = null;
    },
    handleSetAuthUser: (state, action) => {
      state.user = action.payload.user;
    },
    handleSetUserLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.otpTokenHeader = null;
      state.apiKey = null;
    },
    handleSetSchoolRegistration: (state, action) => {
       state.schoolId = action.payload.schoolId;
    },
    handleSetSchoolBranchRegistration: (state, action) => {
       state.schoolBranchId = action.payload.schoolBranchId;
       state.schoolId = null;
    },
    handleSetSubcription: (state, action) => {
       state.apiKey = action.payload.apiKey;
       state.schoolBranchId = null
    },
    handleSetCreateAdmin: (state) => {
       state.apiKey = null;
    },
    handleSetPasswordReset: (state, action) => {
       state.passwordResetOtpToken = action.payload.resetPasswordOtpToken
    },
    handleSetValidatePasswordResetOtp: (state, action) => {
       state.passwordResetOtpToken = null
       state.passwordResetToken = action.payload.passwordResetToken
    },
    handleSetChangePassword: (state) => {
       state.passwordResetToken = null
    }
  },
});

export const {
  handleSetAuthUser,
  handleSetPasswordReset,
  handleSetTwoFA,
  handleSetUserLogin,
  handleSetUserLogout,
  handleSetSchoolBranchRegistration,
  handleSetSchoolRegistration,
  handleSetSubcription,
  handleSetValidatePasswordResetOtp,
  handleSetCreateAdmin,
  handleSetChangePassword
} = authSlice.actions;
export default authSlice.reducer;
