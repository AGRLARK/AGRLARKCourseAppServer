import express from "express";
import { isAuthenticated } from "./../middleware/auth.js";
import {
  login,
  register,
  logout,
  getMyProfile,
} from "./../controllers/userController.js";

const router = express.Router();

router.route("/register").post(register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Get my Profile
router.route("/profile").get(isAuthenticated, getMyProfile);
// Change Password
// Update Profile
// Update Profile Picture

// Forget Password
// Reset Password

// AddtoPlaylist
// RemoveFromPlaylist

export default router;
