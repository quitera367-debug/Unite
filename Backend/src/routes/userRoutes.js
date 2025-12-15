const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile, requestReset, resetPassword, logoutUser, sentOtp} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware"); // middleware to protect routes
const upload = require("../middlewares/uploadMiddleware");


const router = express.Router();



// Register user
router.post("/otp", sentOtp); //done
router.post("/register", registerUser); //done

// Login user
router.post("/login", loginUser); //done
router.post("/logout", protect, logoutUser); //done

// Reset Password
router.post("/request-reset", requestReset);//done
router.patch("/reset-password", resetPassword);//done

// User profile (protected route)
router.get("/me", protect, getUserProfile);//done
router.put("/me", protect, upload.single("profile"), updateUserProfile);//done

module.exports = router;