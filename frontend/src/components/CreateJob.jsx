import { useState } from "react";
import API from "../api/api";

function CreateJob({ fetchJobs }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [questionCount, setQuestionCount] = useState("");
  const [duration, setDuration] = useState("");

  const [questions, setQuestions] = useState([]);

  const generateQuestions = () => {
    if (!questionCount || questionCount <= 0) {
      alert("Enter number of questions");
      return;
    }

    const newQuestions = [];

    for (let i = 0; i < questionCount; i++) {
      newQuestions.push({
        question: "",
        type: "coding",
        options: ["", "", "", ""],
        expectedAnswer: "",
      });
    }

    setQuestions(newQuestions);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  // Create Job
  const createJob = async () => {
    if (!title || !description) {
      alert("Fill job details");
      return;
    }

    if (!duration) {
      alert("Set test duration");
      return;
    }

    try {
      await API.post("/jobs", {
        title,
        description,
        duration,
        questions,
      });

      alert("Job Created Successfully");
      // refresh job list
      fetchJobs();
      // reset form
      setTitle("");
      setDescription("");
      setQuestionCount("");
      setDuration("");
      setQuestions([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create job");
    }
  };

  return (
    <div className="card">
      <h2>Create Job</h2>

      <input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>How many questions do you want to add for this role?</label>

      <input
        type="number"
        placeholder="Enter number of questions"
        value={questionCount}
        onChange={(e) => setQuestionCount(Number(e.target.value))}
      />

      {questions.length === 0 && (
        <button onClick={generateQuestions}>Set Questions</button>
      )}

      {questions.map((q, index) => (
        <div key={index} className="question-box">
          <h4>Question {index + 1}</h4>

          <textarea
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => updateQuestion(index, "question", e.target.value)}
          />

          <select
            value={q.type}
            onChange={(e) => updateQuestion(index, "type", e.target.value)}
          >
            <option value="coding">Coding</option>
            <option value="mcq">MCQ</option>
            <option value="text">Text</option>
          </select>

          {q.type === "mcq" &&
            q.options.map((opt, i) => (
              <input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => updateOption(index, i, e.target.value)}
              />
            ))}

          <input
            placeholder="Expected Answer"
            value={q.expectedAnswer}
            onChange={(e) =>
              updateQuestion(index, "expectedAnswer", e.target.value)
            }
          />
        </div>
      ))}

      {questions.length > 0 && (
        <>
          <label>Test duration (minutes)</label>

          <input
            type="number"
            placeholder="Enter time duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />

          <button onClick={createJob}>Create Job</button>
        </>
      )}
    </div>
  );
}

export default CreateJob;
