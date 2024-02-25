import Course from "./../model/Course.js";
import { catchAsyncError } from "./../middleware/catchAsyncError.js";
import ErrorHandler from "./../utils/ErrorHandler.js";

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

  //Here we will use Multer
  // const file = req.file;
  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: "temp id",
      url: "temp url",
    },
  });

  res.status(201).json({
    success: true,
    message: "Course Created Successfully. You can add lectures now",
  });
});
