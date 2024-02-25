import mongoose from "mongoose";
// import { validate } from "node-cron";
import validator from "validator";

const schema = new mongoose.Schema({
  // Name type, required
  name: {
    type: String,
    required: [true, "Please Enter your name "],
  },
  //   Email type, required, unique, validate
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  //   Password type, required, minLength, select
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be atleast of 6 character"],
    select: false,
  },
  //   Role type, enum, default
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  //   Subscription id, status
  subscription: {
    id: String,
    status: String,
  },
  //   Avatar public_id, url
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  //   Playlist [ courseId,poster ]
  playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],
  //   CreatedAt type, default
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  //   ResetPasswordToken type
  ResetPasswordToken: String,
  //   ResetPasswordExpire type
  ResetPasswordExpire: String,
});

const User = mongoose.model("User", schema);

export default User;
