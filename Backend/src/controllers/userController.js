const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uploadToCloudinary  = require("../utils/uploadToCloudinary");
const cloudinary = require("../config/cloudinary");
const sendEmail = require("../utils/sendEmail");


const sentOtp = async (req, res) => {
  try {
    const { email,otp } = req.body;
    console.log(req.body);
    await sendEmail(
       email, 
       "OTP for your ulfat.e.odhani authentication", 
       `Verification Code: ${otp}`
    );
    
    res.status(200).json({ message: "OTP sent to email"});

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
     const generateToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", generateToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    

    res.status(201).json({ 
        success: true, 
        user, 
        token: generateToken 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email }).select("+password").populate("rooms.room");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
       const generateToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", generateToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ 
        success: true, 
        user, 
        token: generateToken   
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forget / Reset Password
const requestReset = async (req, res) => {
  try {
    const { email } = req.body; 

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    res.status(200).json({ message: "Email verified, OTP sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and new password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update password
    user.password = password;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("rooms.room")

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    if (req.file) {
      // delete old photo if not default
      if (
        user.profilePhoto &&
        !user.profilePhoto.includes("icon-7797704_640.png")
      ) {
        const publicId = user.profilePhoto
          .split("/")
          .slice(-1)[0]
          .split(".")[0];
        try {
          await cloudinary.uploader.destroy(`profiles/${publicId}`);
        } catch (err) {
          console.warn("Old image deletion failed:", err.message);
        }
      }

      // Upload new photo
      const result = await uploadToCloudinary(req.file.buffer, "profiles");
      user.profilePhoto = result.secure_url;
    }

    const updatedUser = await user.save();

    const { password, ...userData } = updatedUser.toObject();

    res.status(200).json({
      message: "Profile updated successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }

};

const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
        res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  requestReset,
  resetPassword,
  logoutUser,
  sentOtp
};
