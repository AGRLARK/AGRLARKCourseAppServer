import express from "express";
import { getAllCourses } from "../controllers/courseContoller.js";

const router = express.Router();

router.route("/courses").get(getAllCourses);

export default router;
