import express from "express";
const router = express.Router();

import { getFiles, uploadFiles, uploadFilesS3 } from "../controllers/images.js";
import { auth } from "./auth.js";
import upload from "../middleware/uploadhandler.js";
import { uploadImageS3 } from "../middleware/uploadImageS3Handler.js";

router.get("/", auth, getFiles);
router.post("/", auth, upload.single("file"), uploadFiles);
router.post("/uploads3", auth, uploadImageS3.single("file"), uploadFilesS3);

export default router;
