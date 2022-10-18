import { Router } from "express";
import userController from "../../controllers/comment";

const router = Router()
router.get("/:id/comment", userController.get)
router.post("/:id/comment", userController.add)
//router.delete("/:id", userController.delete)
//router.put("/:id", userController.edit)
// localhost:3000/api/blog/633ecbac70f4e7f6ef1aa612/comment
export default router