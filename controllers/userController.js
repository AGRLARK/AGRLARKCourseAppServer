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
