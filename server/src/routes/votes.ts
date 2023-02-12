import { Router } from "express";
import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";

const vote = () => {};

const router = Router();
router.post("/", userMiddleware, authMiddleware, vote);

export default router;
