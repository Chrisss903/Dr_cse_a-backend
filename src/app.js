import express from "express";
import authRoutes from "./routes/auth/auth.routes.js";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`
});

console.log(process.env.NODE_ENV,"haaaaaa");


const app = express();
app.use(express.json());
app.use(authRoutes);

export default app;
