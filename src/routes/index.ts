import { Router } from "express";
import users from "./user/user";
import blog from "./blogs/blog";
import comment from "./comment/comment";

const router = Router()
router.use("/users", users)
router.use("/blog", comment)
router.use("/blog", blog)

export default router