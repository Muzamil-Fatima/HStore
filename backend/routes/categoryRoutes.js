import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import { createCategory } from "../controllers/categoryController";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);

export default router;
