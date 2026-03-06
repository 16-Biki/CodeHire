import Test from "../models/Test.js";

export const createTest = async (req, res) => {
  const { jobId, question, expectedOutput } = req.body;

  let test = await Test.findOne({ jobId });

  if (!test) {
    test = await Test.create({
      jobId,
      questions: [],
    });
  }

  test.questions.push({
    question,
    expectedOutput,
  });

  await test.save();

  res.json(test);
};
