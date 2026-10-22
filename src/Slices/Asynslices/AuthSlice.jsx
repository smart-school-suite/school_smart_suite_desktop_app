import { createSlice } from "@reduxjs/toolkit";
import { addSeconds } from "date-fns";

const initialState = {
  isAuthenticated: false,
  user: null,
  loginContext: {
    email: "",
    cooldownExpiresAt: null,
  },
  passwordResetContext: {
    email: "",
    cooldownExpiresAt: null,
  },
  signUpForm: {
    schoolName: "",
    countryId: "",
    type: "",
    schoolBranchName: "",
    abbreviation: "",
    adminFullName: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPassword: ""
  },
  signUpErrors: {
    countryId: null,
    type: null,
  },
  signUpFieldValidity: {
    schoolName: null,
    schoolBranchName: null,
    abbreviation: null,
    adminFullName: null,
    adminFirstName: null,
    adminLastName: null,
    adminEmail: null,
    adminPassword: null
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginContext: (state, action) => {
      const { value, field } = action.payload;
      state.loginContext[field] = value;
    },
    setPasswordResetContext: (state, action) => {
      const { value, field } = action.payload;
      state.passwordResetContext[field] = value;
    },
    startOtpCooldown: (state, action) => {
      const { cooldownSeconds, context } = action.payload;
      const expiryDate = addSeconds(new Date(), cooldownSeconds);
      state[context].cooldownExpiresAt = expiryDate.getTime();
    },
    clearOtpCooldown: (state, action) => {
      const { context } = action.payload;
      state[context].cooldownExpiresAt = null;
    },
    handleSetAuthUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = Boolean(action.payload.user);
    },
    updateSignUpFormField: (state, action) => {
      const { field, value } = action.payload;
      state.signUpForm[field] = value;
    },
    setSignUpFieldError: (state, action) => {
      const { field, value } = action.payload;
      state.signUpErrors[field] = value;
    },
    setSignUpFieldValidity: (state, action) => {
      const { field, value } = action.payload;
      state.signUpFieldValidity[field] = value;
    },
    resetAuthState: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
    },
    resetAllState: () => initialState,
  },
});

export const {
  setLoginContext,
  startOtpCooldown,
  clearOtpCooldown,
  setPasswordResetContext,
  handleSetAuthUser,
  updateSignUpFormField,
  setSignUpFieldError,
  setSignUpFieldValidity,
  resetAuthState,
  resetAllState,
} = authSlice.actions;

export default authSlice.reducer;