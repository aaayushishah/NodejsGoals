import express from "express";
const router = express.Router();

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  login,
  updateUser,
} from "../controllers/user.js";
import { auth } from "./auth.js";

router.get("/", auth, getUsers);
router.post("/login", login);
router.post("/register", createUser);
router.get("/:id", auth, getUserById);
router.delete("/:id", auth, deleteUser);
router.patch("/:id", auth, updateUser);
export default router;
