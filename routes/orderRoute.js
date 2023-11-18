import express from "express";
import { verifyToken } from "../middlewares/verifyJWT.js";
import {
  getOrders,
  createCheckoutSession,
  confirm,
  cancel,
} from "../controllers/orderController.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/createpayment/:id", verifyToken, createCheckoutSession);
router.get("/confirm/:id", verifyToken, confirm);
router.get("/cancel/:id", verifyToken, cancel);

export default router;
