import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  buySubscription,
  getRazorPayKey,
  paymentVerification,
} from "./../controllers/paymentController.js";

const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);

// Verify payment and save reference in database
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

// Get Razorpay Key
router.route("/razorpaykey").get(getRazorPayKey);

export default router;
