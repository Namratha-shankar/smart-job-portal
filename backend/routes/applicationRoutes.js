import express from "express";
import multer from "multer";
import { applyJob, getApplications } from "../controllers/applicationController.js";

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// APPLY JOB (with file upload)
router.post("/", upload.single("resume"), applyJob);

// GET ALL APPLICATIONS
router.get("/", getApplications);

export default router;