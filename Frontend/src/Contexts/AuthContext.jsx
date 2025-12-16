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
    window.open("https://unite-hmwc.onrender.com/api/users/google", "_self");
  };
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users` || "http://localhost:5000/api/users";

  const checkUserLoggedIn = async () => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      let token = searchParams.get("token");

      if (!token) {
        token = localStorage.getItem("token");
      }

      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const { data } = await axios.get(`${API_URL}/me`);
        setUser(data.user);

        // 3. JS WAY: Clean URL (Remove ?token=... without reloading)
        if (searchParams.get("token")) {
           const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
           window.history.replaceState({ path: newUrl }, "", newUrl);
        }
      } else {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
      }

    } catch (error) {
      console.error("Auth Check Failed:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  checkUserLoggedIn();
}, []);
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
