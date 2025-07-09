import { Router } from "express";
import { adminRoute, protectedRoute } from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectedRoute, adminRoute, getAllUsers)
export default router;