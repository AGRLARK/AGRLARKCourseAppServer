import Course from "./../model/Course.js";
import { catchAsyncError } from "./../middleware/catchAsyncError.js";
import ErrorHandler from "./../utils/ErrorHandler.js";
import getDatauri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find().select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please add all fields", 400));

  //Here we have used Multer
  const file = req.file;
  const fileUri = getDatauri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Course Created Successfully. You can add lectures now",
  });
});

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course Not Found", 404));

  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

// Max video size is 100MB
export const addLectures = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  // const file = req.file

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("Course Not Found", 404));

  //Here we have used Multer
  const file = req.file;
  const fileUri = getDatauri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  //upload file here
  course.lectures.push({
    title,
    description,
    video: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added in Course",
  });
});

export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("Course Not Found", 404));

  console.log(course.poster.public_id);
  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id);
    console.log(singleLecture.poster.public_id);
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});
