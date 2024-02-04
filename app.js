import express from "express";
import { config } from "dotenv";

export const app = express();

config({
  path: "./config/config.env",
});

// Importing & Using Routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);
