import express from "express";
const router = express.Router();

import {
  addToCart,
  deleteCartProduct,
  getCartList,
} from "../controllers/cart.js";
import { auth } from "./auth.js";

router.get("/", auth, getCartList);
router.post("/add", auth, addToCart);
router.delete("/:id", auth, deleteCartProduct);
export default router;
