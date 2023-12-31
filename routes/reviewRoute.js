import express from "express";
import { verifyToken } from "../middlewares/verifyJWT.js";
import {
  createReview,
  deleteReview,
  getReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:gigId", getReviews);
router.delete("/:id", deleteReview);

export default router;
