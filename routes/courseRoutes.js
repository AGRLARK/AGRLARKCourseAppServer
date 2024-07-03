import express from "express";
import singleUpload from "./../middleware/multer.js";
import { isAuthenticated, authorizeAdmin } from "./../middleware/auth.js";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "./../controllers/courseContoller.js";

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - only admin
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// Add lecture,Delete Course , Get course lecture
router
  .route("/course/:id")
  .get(isAuthenticated, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLectures)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Delete Lectures
router
  .route("/deleteLecture")
  .delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
