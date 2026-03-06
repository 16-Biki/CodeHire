import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const job = await Job.create({
    title: req.body.title,
    description: req.body.description,
    companyId: req.user.companyId,
  });

  res.json(job);
};

export const getCompanyJobs = async (req, res) => {
  const jobs = await Job.find({
    companyId: req.user.companyId,
  });

  res.json(jobs);
};

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();

  res.json(jobs);
};
