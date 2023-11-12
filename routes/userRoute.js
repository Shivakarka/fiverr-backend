import express from "express";
import { deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);

export default router;
