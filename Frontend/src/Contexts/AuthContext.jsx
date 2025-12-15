import React, { createContext, use, useContext, useEffect, useState } from "react";
import authService from "../Services/authService";
import toast from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthApi = createContext();

export const AuthProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState();
  const [profileData, setProfileData] = useState();
  const [otpData, setOtpData] = useState();
  const [loading, setLoading] = useState(false);

  const genrateOtp = () => {
    return Math.floor(Math.random() * 8999) + 1000;
  };
  const resendCode = () => {
    console.log(otpData);
  };

  const RegisterUser = async (e) => {
    try {
      const data = await authService.register(e);
      console.log(data);
      setProfileData(data);
      window.location.replace("/user");
      toast.success("User Created Successfully");
    } catch (err) {
      toast.error("Server error");
    }
  };

  const LoginUser = async (e) => {
    try {
      const responce = await authService.login(e);
      setProfileData(responce);
      console.log(responce);
      window.location.replace("/user");
      toast.success("User Logind Successfully");
    } catch (err) {
      toast.error("User Login Failed");
    }
  };

  const LogoutUser = async () => {
    try {
      await authService.logout();
      toast.success("User Logout Successfully");
    } catch (err) {
      toast.error("Server error");
    }
  };

  const requestReset = async (inputBox) => {
    try {
      const { data } = await authService.requestreset(inputBox);
      setRegisterData(inputBox);
      console.log(data);
      let genOtp = genrateOtp();
      console.log(genOtp);
    } catch (err) {
      toast.error("Server error");
    }
  };

  const resetPassword = async (inputBox) => {
    try {
      const responce = await authService.resetpassword(inputBox);
      toast.success("Password reset successfully");
    } catch (err) {
      toast.error("Server error");
    }
  };
  const handleGoogleLogin = () => {
    // 1. Redirect user to your BACKEND Google route
    // Ensure this URL matches your server's address
    // If you are on Render, use: "https://your-api.onrender.com/api/users/google"
    window.open("https://unite-hmwc.onrender.com/api/users/google", "_self");
  };
const checkUserLoggedIn = async () => {
  try {
    let token = searchParams.get("token");

    if (!token) token = localStorage.getItem("token");

    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      UserProfile()

      if (searchParams.get("token")) {
        navigate("/", { replace: true });
      }
    } else {
      setUser(null);
    }
  } catch (error) {
    console.error("Auth check failed", error);
    setUser(null);
    localStorage.removeItem("token");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  checkUserLoggedIn();
}, [searchParams]);
  // profile

  const UserProfile = async () => {
    try {
      setLoading(true);
      const { user } = await authService.getProfile();
      setProfileData(user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const EditProfile = async (e) => {
    try {
      const { user } = await authService.editProfile(e);
      setProfileData(user);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <AuthApi.Provider
      value={{
        resetPassword,
        LoginUser,
        RegisterUser,
        LogoutUser,
        registerData,
        setRegisterData,
        otpData,
        genrateOtp,
        setOtpData,
        resendCode,
        requestReset,
        profileData,
        setProfileData,
        UserProfile,
        EditProfile,
        loading,
        setLoading,
        handleGoogleLogin,
      }}
    >
      {children}
    </AuthApi.Provider>
  );
};

export const useAuth = () => useContext(AuthApi);
