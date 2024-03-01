import { catchAsyncError } from "./../middleware/catchAsyncError.js";
import ErrorHandler from "./../utils/ErrorHandler.js";
import User from "./../model/User.js";
import { SendToken } from "./../utils/SendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  // const file = req.file;

  if (!name || !email || !password)
    return next(new ErrorHandler("Please fill all the fields", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist ", 409));

  //Upload file on cloudinary
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempid",
      url: "tempurl",
    },
  });
  SendToken(res, user, "Registered Successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("email", email, "password", password);

  // const file = req.file;

  if (!email || !password)
    return next(new ErrorHandler("Please fill all the fields", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 401));

  SendToken(res, user, `Welcome Back , ${user.name} `, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      sucess: true,
      message: "Logout Successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    sucess: true,
    user,
  });
});
