import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConfig.js";
import cors from "cors";
import {
  authRoute,
  conversationRoute,
  gigRoute,
  messageRoute,
  orderRoute,
  reviewRoute,
  userRoute,
} from "./routes/index.js";

const app = express();

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://fiverr-clone-sk.netlify.app"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Fiverr Clone API");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal server error.";
  res.status(statusCode).json({ error: errorMessage });
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});
