import Submission from "../models/Submission.js";

export const submitCode = async (req, res) => {
  try {
    const { jobId, answers } = req.body;

    const existing = await Submission.findOne({
      candidateId: req.user._id,
      jobId,
    });

    if (existing) {
      return res.status(400).json({
        message: "You have already submitted this test",
      });
    }

    const submission = await Submission.create({
      candidateId: req.user._id,
      jobId,
      answers,
    });

    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      jobId: req.params.jobId,
    }).populate("candidateId", "name email");

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
