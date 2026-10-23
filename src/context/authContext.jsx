import { TOKEN_KEY } from "@/constants";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleSetAuthUser,
  resetAllState,
  resetAuthState,
  setLoginContext,
  setPasswordResetContext,
  startOtpCooldown
} from "../Slices/Asynslices/AuthSlice";
import axios from "../axios/axios";
import { secureTokenStorage } from "../services/secureStore/secureTokenStorage";
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authError, setAuthError] = useState({
    login: null,
    otp: null,
    changePassword: null,
    passwordResetError: null,
    passwordResetOtp: null,
    changeAuthPassword: null,
    createSchool: null,
    createSchoolBranch: null,
    subscribe: null,
    admin: null,
    logout: null,
    resendLoginOtp: null,
    resendPasswordResetOtp: null,
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    login: false,
    otp: false,
    createSchool: false,
    createSchoolBranch: false,
    subscribe: false,
    admin: false,
    changeAuthPassword: false,
    passwordReset: false,
    passwordResetOtp: false,
    changePassword: false,
    resendLoginOtp: false,
    resendPasswordResetOtp: false,
  });

  const handleLogin = async (email, password, navigate, dispatch) => {
    setLoading((prevalue) => ({ ...prevalue, login: true }));
    setAuthError((prevalue) => ({ ...prevalue, login: null }));
    try {
      const response = await axios.post("auth/school-admin/login", {
        email,
        password,
      });
      const responseData = response.data.data;
      await secureTokenStorage.save(
        TOKEN_KEY.OTP_TOKEN,
        responseData.otp_token_header,
      );
      if (dispatch) {
        dispatch(
          setLoginContext({
            field: "email",
            value: email,
          }),
        );
        dispatch(
          startOtpCooldown({
            cooldownSeconds: 60,
            context: "loginContext",
          }),
        );
      }
      navigate("/verify-otp");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again.";

      setAuthError((prevalue) => ({
        ...prevalue,
        login: errorMessage,
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, login: false }));
    }
  };
  const handleTwoStepVerification = async (otp, navigate) => {
    setLoading((prevalue) => ({ ...prevalue, otp: true }));
    setAuthError((prevalue) => ({ ...prevalue, otp: null }));
    try {
      const tokenHeader = await secureTokenStorage.get(TOKEN_KEY.OTP_TOKEN);
      const response = await axios.post(
        "auth/school-admin/verify-otp",
        {
          otp,
        },
        {
          headers: { "X-OTP-Token": tokenHeader },
        },
      );
      const responseData = response.data.data;
      await secureTokenStorage.save(
        TOKEN_KEY.AUTH_TOKEN,
        responseData.authToken,
      );
      await getAuthenticatedUser(responseData.authToken);
      navigate("/school-admins");
      await secureTokenStorage.remove(TOKEN_KEY.OTP_TOKEN);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Two step verification failed. Please check credentials and try again";

      setAuthError((prevalue) => ({
        ...prevalue,
        otp: errorMessage,
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, otp: false }));
    }
  
  };
  const handleAdminLogout = async (navigate) => {
    setLoading((prevalue) => ({ ...prevalue, admin: true }));
    setAuthError((prevalue) => ({ ...prevalue, logout: null }));
    try {
      const token = await secureTokenStorage.get(TOKEN_KEY.AUTH_TOKEN);
      await axios.post(
        "auth/school-admin/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(resetAllState());
      if(token) {
        await secureTokenStorage.remove(TOKEN_KEY.OTP_TOKEN);
      }
      navigate("/login-school-admin");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Logout failed";

      setAuthError((prevalue) => ({
        ...prevalue,
        logout: errorMessage,
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, admin: false }));
    }
  };
  const getAuthenticatedUser = useCallback(
    async () => {
       const token = await secureTokenStorage.get(TOKEN_KEY.AUTH_TOKEN);
      try {
        const response = await axios.get("auth/school-admin/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(handleSetAuthUser({ user: response.data.data }));
      } catch (error) {
        handleAdminLogout();
        navigate("/login-school-admin");
      }
    },
    [handleAdminLogout],
  );
  const handleSubscription = async (
    navigate,
    subscriptionCredentials,
    handleCloseDrawer,
    handleCloseModal,
    dispatch
  ) => {
    setLoading((prevalue) => ({ ...prevalue, subscribe: true }));
    setAuthError((prevalue) => ({ ...prevalue, subscribe: null }));
    try {
      const response =  await axios.post(
        "school-subscription/subscribe",
        subscriptionCredentials,
      );
      if (handleCloseDrawer) {
        handleCloseDrawer();
      }
      if (handleCloseModal) {
        handleCloseModal();
      }
      if(dispatch){
         dispatch(resetAuthState())
      }
      const responseData = response.data.data;
      await secureTokenStorage.save(
        TOKEN_KEY.AUTH_TOKEN,
        responseData.authToken,
      );
      await getAuthenticatedUser(responseData.authToken);
      navigate("/school-admins");
    } catch (e) {
      const errorMessage =
        e.response?.data?.message ||
        e.response?.data?.error ||
        "Something went wrong trying to create school";

      setAuthError((prevState) => ({
        ...prevState,
        subscribe: errorMessage,
      }));
    } finally {
      setLoading((prevState) => ({ ...prevState, subscribe: false }));
    }
  
  };
  const handlePasswordReset = async (navigate, email) => {
    setLoading((prevalue) => ({ ...prevalue, passwordReset: true }));
    setAuthError((prevalue) => ({ ...prevalue, passwordResetError: null }));
    try {
      const response = await axios.post("auth/school-admin/password/reset", {
        email,
      });
      const responseData = response.data.data;
      await secureTokenStorage.save(
        TOKEN_KEY.OTP_TOKEN,
        responseData.otp_token_header,
      );
      if (dispatch) {
        dispatch(
          setPasswordResetContext({
            field: "email",
            value: email,
          }),
        );
        dispatch(
          startOtpCooldown({
            cooldownSeconds: 60,
            context: "passwordResetContext",
          }),
        );
      }
      navigate("/validate-otp");
    } catch (e) {
      const errorMessage =
        e.response?.data?.message ||
        e.response?.data?.error ||
        "Oops! Something went wrong, please try again";

      setAuthError((prevalue) => ({
        ...prevalue,
        passwordResetError: errorMessage,
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, passwordReset: false }));
    }
  };
  const handleValidatePasswordResetOtp = async (navigate, otp) => {
    setLoading((prevalue) => ({ ...prevalue, passwordResetOtp: true }));
    setAuthError((prevalue) => ({ ...prevalue, passwordResetOtp: null }));
    const tokenHeader = await secureTokenStorage.get(TOKEN_KEY.OTP_TOKEN);
    try {
      const response = await axios.post(
        "auth/school-admin/password/reset/verify-otp",
        {
          otp,
        },
        {
          headers: { "X-OTP-Token": tokenHeader },
        },
      );
      const responseData = response.data.data;
      await secureTokenStorage.save(
        TOKEN_KEY.PASSWORD_RESET_TOKEN,
        responseData.reset_token,
      );
      navigate("/change-password");
    } catch (e) {
      const errorMessage =
        e.response?.data?.message ||
        e.response?.data?.error ||
        "Something went wrong trying to validate OTP, try again";

      setAuthError((prevalue) => ({
        ...prevalue,
        passwordRestOtp: errorMessage,
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, passwordResetOtp: false }));
    }
  };
  const handleChangePassword = async (
    navigate,
    passwordCredentails
  ) => {
    setLoading((prevalue) => ({ ...prevalue, changePassword: true }));
    setAuthError((prevalue) => ({ ...prevalue, changePassword: null }));
     const passwordResetToken = await secureTokenStorage.get(TOKEN_KEY.PASSWORD_RESET_TOKEN);
    try {
      await axios.post(
        "auth/school-admin/password/reset/update",
        {
          new_password: passwordCredentails.new_password,
          new_password_confirmation:
            passwordCredentails.new_password_confirmation,
        },
        {
          headers: {
            "X-PASSWORD-RESET-Token": passwordResetToken,
          },
        },
      );
      await secureTokenStorage.remove(TOKEN_KEY.PASSWORD_RESET_TOKEN);
      await secureTokenStorage.remove(TOKEN_KEY.OTP_TOKEN);
      navigate("/login-school-admin");
    } catch (e) {
      const errorMessage =
        e.response?.data?.message ||
        e.response?.data?.error ||
        "Something went wrong, please try again";

      setAuthError((prevalue) => ({
        ...prevalue,
        changePassword: errorMessage,
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, changePassword: false }));
    }
  };
  const handleChangePasswordAuthUser = async (
    handleClose,
    authToken,
    apiKey,
    passwordCredentails,
  ) => {
    setLoading((prevalue) => ({ ...prevalue, changeAuthPassword: true }));
    setAuthError((prevalue) => ({ ...prevalue, changeAuthPassword: null }));
    try {
      await axios.post(
        "school-admin/change-password",
        {
          current_password: passwordCredentails.current_password,
          new_password: passwordCredentails.new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "API-KEY": apiKey,
          },
        },
      );
      handleClose();
    } catch (e) {
      const errorMessage =
        e.response?.data?.message ||
        e.response?.data?.error ||
        "Something went wrong while updating your password";

      setAuthError((prevalue) => ({
        ...prevalue,
        changeAuthPassword: errorMessage,
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, changeAuthPassword: false }));
    }
  };
  const handleResendOtp = async (dispatch) => {
    setLoading((prevalue) => ({ ...prevalue, resendLoginOtp: true }));
    setAuthError((prevalue) => ({ ...prevalue, resendLoginOtp: null }));
    const tokenHeader = await secureTokenStorage.get(TOKEN_KEY.OTP_TOKEN);
    try {
      await axios.post(
        "auth/school-admin/resend-otp",
        {},
        {
          headers: { "X-OTP-Token": tokenHeader },
        },
      );
      if (dispatch) {
        dispatch(
          startOtpCooldown({
            cooldownSeconds: 60,
            context: "loginContext",
          }),
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again.";

      setAuthError((prevalue) => ({
        ...prevalue,
        resendLoginOtp: errorMessage,
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, resendLoginOtp: false }));
    }
  };
  const handleResendPasswordReseOtp = async (dispatch) => {
    console.log("Resend Otp ran");
    setLoading((prevalue) => ({ ...prevalue, resendPasswordResetOtp: true }));
    setAuthError((prevalue) => ({ ...prevalue, resendPasswordResetOtp: null }));
    const tokenHeader = await secureTokenStorage.get(TOKEN_KEY.OTP_TOKEN);
    try {
      await axios.post(
        "auth/school-admin/resend-otp",
        {},
        {
          headers: { "X-OTP-Token": tokenHeader },
        },
      );
      if (dispatch) {
        dispatch(
          startOtpCooldown({
            cooldownSeconds: 60,
            context: "passwordResetContext",
          }),
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again.";

      setAuthError((prevalue) => ({
        ...prevalue,
        resendPasswordResetOtp: errorMessage,
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, resendPasswordResetOtp: false }));
    }
  };
  const contextValue = React.useMemo(
    () => ({
      authError,
      loading,
      handlePasswordReset,
      handleLogin,
      handleAdminLogout,
      handleTwoStepVerification,
      handleSubscription,
      handleValidatePasswordResetOtp,
      handleChangePassword,
      handleChangePasswordAuthUser,
      getAuthenticatedUser,
      handleResendOtp,
      handleResendPasswordReseOtp
    }),
    [
      authError,
      loading,
      handlePasswordReset,
      handleLogin,
      handleAdminLogout,
      handleTwoStepVerification,
      handleSubscription,
      handleValidatePasswordResetOtp,
      handleChangePassword,
      handleChangePasswordAuthUser,
      getAuthenticatedUser,
      handleResendOtp,
      handleResendPasswordReseOtp
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
