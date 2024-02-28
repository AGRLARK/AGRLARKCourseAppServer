import express from "express";
import { login, register, logout } from "./../controllers/userController.js";

const router = express.Router();

router.route("/register").post(register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);
// Get my Profile
// Change Password
// Update Profile
// Update Profile Picture

// Forget Password
// Reset Password

// AddtoPlaylist
// RemoveFromPlaylist

export default router;
