import express from "express";
import connectDB from "./config/dbConfig.js";

const app = express();

connectDB();

app.listen(8800, () => {
  console.log("Backend server is running!");
});
