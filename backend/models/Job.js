import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,

  type: {
    type: String,
    enum: ["coding", "mcq", "text"],
    default: "coding",
  },

  options: [String], // MCQ only

  expectedAnswer: String,
});

const jobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    duration: {
      type: Number,
      default: 30,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    questions: [questionSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Job", jobSchema);
