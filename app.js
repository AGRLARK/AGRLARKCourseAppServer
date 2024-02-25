import express, { urlencoded } from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middleware/Error.js";

export const app = express();

config({
  path: "./config/config.env",
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// // Importing & Using Routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);

app.use(ErrorMiddleware);
