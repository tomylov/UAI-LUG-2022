import { Router } from "express";
import blogController from "../../controllers/blog";

const router = Router()
//router.get("/", userController.get)
router.post("/:id/comment", blogController.add)
//router.delete("/:id", userController.delete)
//router.put("/:id", userController.edit)
//"localhost:3000/api/blog/elid/comment"
export default router