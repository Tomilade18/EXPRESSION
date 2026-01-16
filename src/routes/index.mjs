import { Router } from "express";
import productsRouter from "./products.mjs"
import usersRouter from "./users.mjs"

const router = Router();

router.use(productsRouter);
router.use(usersRouter); 



export default router;