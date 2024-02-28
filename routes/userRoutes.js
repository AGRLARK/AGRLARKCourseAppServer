import express from "express";
import { register } from "./../controllers/userController.js";

const router = express.Router();

router.route("/register").post(register);

// Login
// Logout
// Get my Profile
// Change Password
// Update Profile
// Update Profile Picture

// Forget Password
// Reset Password

// AddtoPlaylist
// RemoveFromPlaylist

export default router;
