import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import authService from "../Services/authService";
import toast from "react-hot-toast";
import axios from "axios";
import emailjs from "@emailjs/browser";

const AuthApi = createContext();

export const AuthProvider = ({ children }) => {
  const [registerData, setRegisterData] = useState();
  const [profileData, setProfileData] = useState();
  const [otpData, setOtpData] = useState();
  const [loading, setLoading] = useState(false);

  const genrateOtp = () => {
    return Math.floor(Math.random() * 8999) + 1000;
  };
  const resendCode = (e) => {
    sendOTP(e, otpData);
  };

  const sendOTP = async (e, i) => {
    const templateParams = {
      email: e,
      passcode: i, // This matches {{otp_code}} in your template
    };
    try {
      toast.success(`Otp has sent to ${e}`);

      await emailjs.send(
        "service_sh0yica", // Replace with your Service ID
        "template_et8t78a", // Replace with your Template ID
        templateParams,
        "kh5gOkzF_a7DsE-go" // Replace with your Public Key
      );
    } catch (err) {
      console.log(err);
    }
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
  const API_URL =
    `${import.meta.env.VITE_API_BASE_URL}/users` ||
    "http://localhost:5000/api/users";

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
        setProfileData(data.user);

        if (searchParams.get("token")) {
          const newUrl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
          window.history.replaceState({ path: newUrl }, "", newUrl);
        }
      } else {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setProfileData(null);
      }
    } catch (error) {
      console.error("Auth Check Failed:", error);
      localStorage.removeItem("token");
      setProfileData(null);
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
      toast.loading("loading...");
      const { user } = await authService.editProfile(e);
      toast.dismiss();
      toast.success("Profile Edited");
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
        sendOTP,
      }}
    >
      {children}
    </AuthApi.Provider>
  );
};

export const useAuth = () => useContext(AuthApi);
