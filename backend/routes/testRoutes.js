import express from "express";
import Test from "../models/Test.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const test = await Test.create(req.body);
  res.json(test);
});

router.get("/:jobId", async (req, res) => {
  const test = await Test.findOne({ jobId: req.params.jobId });
  res.json(test);
});

export default router;
