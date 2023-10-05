import express from "express";
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../controllers/product.js";
import { auth } from "./auth.js";

router.get("/", auth, getProducts);
router.post("/create", auth, createProduct);
router.delete("/:id", auth, deleteProduct);
export default router;
