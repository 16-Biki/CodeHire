import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  expectedOutput: String,
});

const testSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  questions: [questionSchema],
});

const Test = mongoose.model("Test", testSchema);

export default Test;
