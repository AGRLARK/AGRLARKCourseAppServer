import express from "express";
import {
  createCourse,
  getAllCourses,
} from "./../controllers/courseContoller.js";

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - only admin
router.route("/createcourse").post(createCourse);

// Add lecture,Delete Course , Get course lecture

//Delete lecture

export default router;
