import express from "express";
const router = express.Router();

import {
    placeOrder
} from "../controllers/orders.js";
import { auth } from "./auth.js";

router.post("/", auth, placeOrder);
export default router;
