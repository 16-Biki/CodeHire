import { useState } from "react";
import API from "../api/api";

function CreateJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [questionCount, setQuestionCount] = useState("");
  const [duration, setDuration] = useState("");

  const [questions, setQuestions] = useState([]);

  // Step 1 → Generate question fields
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

  // Update question
  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;

    setQuestions(updated);
  };

  // Update MCQ option
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

      setTitle("");
      setDescription("");
      setQuestionCount("");
      setDuration("");
      setQuestions([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2>Create Job</h2>

      {/* TITLE */}

      <input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* DESCRIPTION */}

      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* NUMBER OF QUESTIONS */}

      <label>How many questions do you want to add for this role?</label>

      <input
        type="number"
        placeholder="Enter number of questions"
        value={questionCount}
        onChange={(e) => setQuestionCount(Number(e.target.value))}
      />

      {/* BUTTON */}

      {questions.length === 0 && (
        <button onClick={generateQuestions}>Set Questions</button>
      )}

      {/* QUESTIONS */}

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

      {/* TEST DURATION AFTER QUESTIONS */}

      {questions.length > 0 && (
        <>
          <label>Test duration (minutes) for this test ?</label>

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
