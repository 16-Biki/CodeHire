import express from "express";
import {
  submitCode,
  getSubmissions,
} from "../controllers/submissionController.js";

import Submission from "../models/Submission.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Candidate submits test
router.post("/", protect, submitCode);

// Candidate: get their own submissions
router.get("/my", protect, async (req, res) => {
  try {
    const submissions = await Submission.find({
      candidateId: req.user._id,
    }).populate("jobId");

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: get submissions for a job
router.get("/:jobId", protect, getSubmissions);

export default router;
