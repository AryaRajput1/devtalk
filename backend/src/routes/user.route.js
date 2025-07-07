import { Router } from "express";
import { adminRoute, protectedRoute } from "../middlewares/auth.middleware.js";

const router = Router();

route.get("/", protectedRoute, adminRoute, getAllUsers)
export default router;