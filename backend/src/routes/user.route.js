import { Router } from "express";
import { adminRoute, protectedRoute } from "../middlewares/auth.middleware";

const router = Router();

route.get("/", protectedRoute, adminRoute, getAllUsers)
export default router;