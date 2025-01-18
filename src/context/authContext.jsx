import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "../axios/axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState({ login: null, otp: null });
  const [loading, setLoading] = useState({
    login: false,
    otp: false,
    createSchool: false,
    createSchoolBranch: false,
    subscribe: false,
    admin: false
  });
  const [createError, setCreateError] = useState({
    createSchool: null,
    createSchoolBranch: null,
    subscribe: null,
    admin:null
  });
  const [schoolBranchId, setSchoolBranchId] = useState(null);

  const getToken = useCallback(() => localStorage.getItem("auth_token"), []);
  const getOtpHeader = useCallback(() =>
    localStorage.getItem("OTP_TOKEN_HEADER", [])
  );
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      getAuthenticatedUser(token);
    }
  }, [getToken]);

  const handleLogin = async (email, password, navigate) => {
    setLoading((prevalue) => ({ ...prevalue, login: true }));
    setAuthError((prevalue) => ({ ...prevalue, login: null }));
    try {
      const response = await axios.post("api/school-admin/login", {
        email,
        password,
      });
      const otp_token_header = response.data.otp_token_header;
      localStorage.setItem("OTP_TOKEN_HEADER", otp_token_header);
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

  const handleTwoStepVerification = async (otp, navigate) => {
    setLoading((prevalue) => ({ ...prevalue, otp: true }));
    setAuthError((prevalue) => ({ ...prevalue, otp: null }));
    const OTP_HEADER_TOKEN = getOtpHeader();
    try {
      const response = await axios.post(
        "api/school-admin/verify-otp",
        {
          otp,
        },
        {
          headers: { OTP_TOKEN_HEADER: OTP_HEADER_TOKEN },
        }
      );
      const token = response.data.token;
      localStorage.setItem("auth_token", token);
      setIsAuthenticated(true);
      localStorage.setItem("AUTH_USER", true);
      await getAuthenticatedUser(token);
      localStorage.removeItem("OTP_TOKEN_HEADER");
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
  const handleAdminLogout = useCallback(
    async (navigate) => {
      try {
        const token = getToken();
        if (token) {
          await axios.post("api/school-admin/logout", {
            headers: { Authorization: `Bearer ${token}` },
          });
          localStorage.removeItem("auth_token");
          localStorage.removeItem("AUTH_USER_DETAILS");
          localStorage.removeItem("SCHOOL_BRANCH_KEY");
          localStorage.removeItem("AUTH_USER");
          setIsAuthenticated(false);
          setUser(null);
          navigate("/login-school-admin");
        }
      } catch (error) {
        console.error("Logout failed", error);
      }
    },
    [getToken]
  );

  const getAuthenticatedUser = useCallback(
    async (token) => {
      try {
        const response = await axios.get("api/school-admin/auth-school-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.schooladmin_user);
        setSchoolBranchId(response.data.schooladmin_user.school_branch_id);
        localStorage.setItem(
          "SCHOOL_BRANCH_KEY",
          response.data.schooladmin_user.school_branch_id
        );
        localStorage.setItem(
          "AUTH_USER_DETAILS",
          response.data.schooladmin_user
        );
      } catch (error) {
        console.error("Error fetching authenticated user", error);
        handleAdminLogout();
      }
    },
    [handleAdminLogout]
  );

  const handleSchoolRegistration = async (navigate, schoolCredentials) => {
    setLoading((prevState) => ({ ...prevState, createSchool: true }));
    setCreateError((prevState) => ({ ...prevState, createSchool: null }));
    try {
      const response = await axios.post(
        "/api/school/register",
        schoolCredentials
      );
      setLoading((prevState) => ({ ...prevState, createSchool: false }));
      setCreateError((prevState) => ({ ...prevState, createSchool: null }));
      localStorage.setItem("SCHOOL_KEY", response.data.school_key);
      navigate("/subcription/plan");
    } catch (e) {
      setCreateError((prevState) => ({
        ...prevState,
        createSchool:
          e.response?.data?.message ||
          "Something went wrong trying to create school",
      }));
    } finally {
      setLoading((prevState) => ({ ...prevState, createSchool: false }));
    }
  };

  const handleSubscription = async (navigate, subscriptionCredentials) => {
    setLoading((prevalue) => ({ ...prevalue, subscribe: true }));
    setCreateError((prevalue) => ({ ...prevalue, subscribe: null }));
    try {
      await axios.post(
        "api/subcription/subscribe",
        subscriptionCredentials
      );
      setLoading((prevalue) => ({ ...prevalue, subscribe: false }));
      setCreateError((prevalue) => ({ ...prevalue, subscribe: null }));
      navigate("/create-schoolbranch");
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

  const handleSchoolBranchRegistration = async (
    navigate,
    schoolBranchCredentials
  ) => {
    setLoading((prevalue) => ({ ...prevalue, createSchoolBranch: true }));
    setCreateError((prevalue) => ({ ...prevalue, createSchoolBranch: null }));
    try {
      const response = await axios.post(
        "api/school-branch/register",
        schoolBranchCredentials
      );
      setLoading((prevalue) => ({ ...prevalue, createSchoolBranch: false }));
      setCreateError((prevalue) => ({ ...prevalue, createSchoolBranch: null }));
      localStorage.clear("SCHOOL_KEY");
      localStorage.setItem(
        "SCHOOL_BRANCH_KEY",
        response.data.school_branch_key
      );
      navigate("/register/school-admin");
    } catch (e) {
      setCreateError((prevState) => ({
        ...prevState,
        createSchoolBranch:
          e.response?.data?.message ||
          "Something went wrong trying to create school",
      }));
    } finally {
      setLoading((prevState) => ({ ...prevState, createSchoolBranch: false }));
    }
  };

  const handleCreateSuperAdmin = async (navigate, schoolAdminCredentials) => {
      setLoading((prevalue) => ({...prevalue, admin:true}));
      setCreateError((prevalue) => ({...prevalue, admin: null}));
      try{
          await axios.post("api/school-admin/register/super-admin", schoolAdminCredentials);
          setLoading((prevalue) => ({...prevalue, admin: false}));
          setCreateError((prevalue) => ({...prevalue, admin: false}));
          localStorage.clear("SCHOOL_BRANCH_KEY");
          navigate("/login-school-admin");
      }
      catch(e){
        setCreateError((prevState) => ({
          ...prevState,
          admin:
            e.response?.data?.message ||
            "Something went wrong trying to create school",
        }));
      }
      finally{
        setLoading((prevState) => ({ ...prevState, admin: false }));
      }
  }

  const contextValue = React.useMemo(
    () => ({
      user,
      isAuthenticated,
      authError,
      loading,
      schoolBranchId,
      createError,
      handleLogin,
      handleAdminLogout,
      handleTwoStepVerification,
      handleSchoolRegistration,
      handleCreateSuperAdmin,
      handleSchoolBranchRegistration,
      handleSubscription
    }),
    [
      user,
      isAuthenticated,
      authError,
      loading,
      createError,
      schoolBranchId,
      handleLogin,
      handleAdminLogout,
      handleTwoStepVerification,
      handleSchoolRegistration,
      handleCreateSuperAdmin,
      handleSchoolBranchRegistration,
      handleSubscription
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
