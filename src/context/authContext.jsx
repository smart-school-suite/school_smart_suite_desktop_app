import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSetAuthUser,
  handleSetChangePassword,
  handleSetPasswordReset,
  handleSetSubcription,
  handleSetTwoFA,
  handleSetUserLogin,
  handleSetUserLogout,
  handleSetValidatePasswordResetOtp,
} from "../Slices/Asynslices/AuthSlice";

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
       passwordRestOtp: null,
       changeAuthPassword: null
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
    changePassword: false
  });

  const [createError, setCreateError] = useState({
    createSchool: null,
    createSchoolBranch: null,
    subscribe: null,
    admin: null,
  });

  const handleLogin = async (email, password, navigate) => {
    setLoading((prevalue) => ({ ...prevalue, login: true }));
    setAuthError((prevalue) => ({ ...prevalue, login: null }));
    try {
      const response = await axios.post("auth/school-admin/login", {
        email,
        password,
      });
      const responseData = response.data.data;
      dispatch(
        handleSetUserLogin({ otpTokenHeader: responseData.otp_token_header })
      );
      navigate("/verify-otp");
    } catch (error) {
      setAuthError((prevalue) => ({
        ...prevalue,
        login: "Login failed. Please check your credentials.",
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, login: false }));
    }
  };

  const handleTwoStepVerification = async (otp, navigate, otpTokenHeader) => {
    setLoading((prevalue) => ({ ...prevalue, otp: true }));
    setAuthError((prevalue) => ({ ...prevalue, otp: null }));
    try {
      const response = await axios.post(
        "auth/school-admin/verify-otp",
        {
          otp,
        },
        {
          headers: { OTP_TOKEN_HEADER: otpTokenHeader },
        }
      );
      const responseData = response.data.data;
      await getAuthenticatedUser(responseData.authToken);
      dispatch(
        handleSetTwoFA({
          authToken: responseData.authToken,
          apiKey: responseData.apiKey,
        })
      );
      navigate("/");
    } catch (error) {
      setAuthError((prevalue) => ({
        ...prevalue,
        otp: "Two step verification failed Please check credentials and try again",
      }));
    } finally {
      setLoading((prevalue) => ({ ...prevalue, otp: false }));
    }
  };

  const handleAdminLogout = async (navigate, token) => {
    try {
      await axios.post("auth/school-admin/logout", 
         {

         },
        {
        headers: { 
          Authorization: `Bearer ${token}`,
       },
      });
      dispatch(handleSetUserLogout());
      navigate("/hero");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getAuthenticatedUser = useCallback(
    async (token) => {
      try {
        const response = await axios.get("auth/school-admin/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(handleSetAuthUser({ user: response.data.data }));
      } catch (error) {
        console.error("Error fetching authenticated user", error);
        handleAdminLogout();
      }
    },
    [handleAdminLogout]
  );

  const handleSubscription = async (navigate, subscriptionCredentials) => {
    setLoading((prevalue) => ({ ...prevalue, subscribe: true }));
    setCreateError((prevalue) => ({ ...prevalue, subscribe: null }));
    try {
      const response = await axios.post(
        "school-subscription/school-subscriptions",
        subscriptionCredentials
      );
      setLoading((prevalue) => ({ ...prevalue, subscribe: false }));
      setCreateError((prevalue) => ({ ...prevalue, subscribe: null }));
      dispatch(handleSetSubcription({ apiKey: response.data.data.api_key }));
      navigate("/register/school-admin");
    } catch (e) {
      setCreateError((prevState) => ({
        ...prevState,
        subscribe:
          e.response?.data?.message ||
          "Something went wrong trying to create school",
      }));
    } finally {
      setLoading((prevState) => ({ ...prevState, subscribe: false }));
    }
  };

  const handleCreateSuperAdmin = async (
    navigate,
    schoolAdminCredentials,
    apiKey
  ) => {
    setLoading((prevalue) => ({ ...prevalue, admin: true }));
    setCreateError((prevalue) => ({ ...prevalue, admin: null }));
    try {
      await axios.post(
        "auth/school-admin/register/super-admin",
        schoolAdminCredentials,
        {
          headers: {
            "API-KEY": apiKey,
          },
        }
      );
      setLoading((prevalue) => ({ ...prevalue, admin: false }));
      setCreateError((prevalue) => ({ ...prevalue, admin: false }));
      navigate("/login-school-admin");
    } catch (e) {
      setCreateError((prevState) => ({
        ...prevState,
        admin:
          e.response?.data?.message ||
          "Something went wrong trying to create school",
      }));
    } finally {
      setLoading((prevState) => ({ ...prevState, admin: false }));
    }
  };

  const handlePasswordReset = async (navigate, email) => {
    setLoading((prevalue) => ({ ...prevalue, passwordReset: true }));
    setAuthError((prevalue) => ({ ...prevalue, passordResetError: null }));
    try {
      const response = await axios.post("school-admin/resetPassword", {
        email,
      });
      const responseData = response.data.data;
      dispatch(
        handleSetPasswordReset({
          resetPasswordOtpToken: responseData.otp_header,
        })
      );
      navigate("/validate-otp");
    } catch (e) {
      setAuthError((prevalue) => ({
        ...prevalue,
        passordResetError: "Opps Something went wrong try again",
      }));
      console.log(e);
    } finally {
      setLoading((prevalue) => ({ ...prevalue, passwordReset: false }));
    }
  };

  const handleValidatePasswordResetOtp = async (
    navigate,
    otp,
    resetPasswordOtpToken
  ) => {
    setLoading((prevalue) => ({ ...prevalue, passwordResetOtp: true }));
    setAuthError((prevalue) => ({ ...prevalue, passwordRestOtp: null }));
    try {
      const response = await axios.post(
        "school-admin/validatePasswordResetOtp",
        {
          otp,
        },
        {
          headers: { OTP_TOKEN_HEADER: resetPasswordOtpToken },
        }
      );
      const responseData = response.data.data;
      dispatch(handleSetValidatePasswordResetOtp({ passwordResetToken: responseData }));
      navigate("/change-password");
    } catch (e) {
      setAuthError((prevalue) => ({
        ...prevalue,
        passwordResetOtp:
          "Something went wrong trying to validate opt try again",
      }));
      console.log(e);
    } finally {
      setLoading((prevalue) => ({ ...prevalue, passwordResetOtp: false }));
    }
  };

  const handleChangePassword = async (navigate, passwordCredentails, passwordResetToken) => {
    setLoading((prevalue) => ({ ...prevalue, changePassword:true }));
    setAuthError((prevalue) => ({ ...prevalue, changePassword:null }))
    try {
      await axios.post("school-admin/updatePassword",
        {
          new_password:passwordCredentails.new_password,
          new_password_confirmation:passwordCredentails.new_password_confirmation
        },
        {
          headers:{
            PASSWORD_RESET_TOKEN:passwordResetToken
          }
        }
      )
      dispatch(handleSetChangePassword());
      navigate("/login-school-admin");
    } catch (e) {
        setAuthError((prevalue) => ({ ...prevalue,  changePassword:"Something went wrong try again"}));
        console.log(e);
    }
    finally{
       setLoading((prevalue) => ({ ...prevalue, changePassword:false }))
    }
  };

  const handleChangePasswordAuthUser = async (handleClose, authToken, apiKey, passwordCredentails) => {
      setLoading((prevalue) => ({ ...prevalue, changeAuthPassword:true }))
      setAuthError((prevalue) => ({ ...prevalue, changeAuthPassword:null }));
      try{
         await axios.post("school-admin/change-password",
          {
            current_password:passwordCredentails.current_password,
            new_password:passwordCredentails.new_password
          },
          {
            headers:{
                Authorization: `Bearer ${authToken}`,
                "API-KEY":apiKey   
            }
         })
        handleClose();
      }
      catch(e){
         setAuthError((prevalue) => ({ ...prevalue, changeAuthPassword:"Somethine went wrong" }));
         console.log(e)
      }
      finally{
        setLoading((prevalue) => ({ ...prevalue, changeAuthPassword:false }))
      }
  }
  const contextValue = React.useMemo(
    () => ({
      authError,
      loading,
      createError,
      handlePasswordReset,
      handleLogin,
      handleAdminLogout,
      handleTwoStepVerification,
      handleCreateSuperAdmin,
      handleSubscription,
      handleValidatePasswordResetOtp,
      handleChangePassword,
      handleChangePasswordAuthUser,
      getAuthenticatedUser 
    }),
    [
      authError,
      loading,
      createError,
      handlePasswordReset,
      handleLogin,
      handleAdminLogout,
      handleTwoStepVerification,
      handleCreateSuperAdmin,
      handleSubscription,
      handleValidatePasswordResetOtp,
      handleChangePassword,
      handleChangePasswordAuthUser,
      getAuthenticatedUser 
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
