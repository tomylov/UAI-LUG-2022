import { Router } from "express";
import users from "./blogs";

const router = Router()
router.use("/users", users)

export default router