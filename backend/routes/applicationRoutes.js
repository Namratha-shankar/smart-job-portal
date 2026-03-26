import express from "express";
import multer from "multer";
import { addApplication } from "../controllers/applicationController.js";

const router = express.Router();

// store files in uploads folder
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), addApplication);

export default router;