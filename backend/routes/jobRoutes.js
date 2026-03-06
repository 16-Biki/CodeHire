import express from "express";
import Job from "../models/Job.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE JOB
router.post("/", protect, async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      companyId: req.user.companyId,
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL JOBS
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// GET SINGLE JOB
router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
});

// DELETE JOB
router.delete("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.companyId.toString() !== req.user.companyId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
