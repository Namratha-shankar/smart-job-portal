import express from "express";
import { addJob, getJobs } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", addJob);
router.get("/", getJobs);

export default router;