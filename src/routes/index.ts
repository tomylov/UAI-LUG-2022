import { Router } from "express";
import cart from "./carts/cart";


const router = Router()
router.use("/cart", cart);

export default router