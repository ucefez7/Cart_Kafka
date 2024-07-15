import express,{ Router } from "express";
import { addToCart,createCart,getCart } from "../controller/cartController";

const router: Router= express.Router();

router.post('/', createCart);
router.post('/add',addToCart)
router.get('/get/:id', getCart)

export default router;