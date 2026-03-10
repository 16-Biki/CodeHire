import express from "express";
import Job from "../models/Job.js";
import Submission from "../models/Submission.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE JOB */
router.post("/", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create jobs" });
    }

    const job = await Job.create({
      ...req.body,
      companyId: req.user.companyId,
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET JOBS */
router.get("/", protect, async (req, res) => {
  try {
    let jobs;

    if (req.user.role === "admin") {
      jobs = await Job.find({
        companyId: req.user.companyId,
      }).lean();
    } else {
      jobs = await Job.find().lean();
    }

    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const count = await Submission.countDocuments({
          jobId: job._id,
        });

        return {
          ...job,
          submissionCount: count,
        };
      }),
    );

    res.json(jobsWithCounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET SINGLE JOB */
router.get("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* DELETE JOB */
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
