import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function AddQuestions() {
  const { id } = useParams();

  const [question, setQuestion] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");

  const addQuestion = async () => {
    await API.post("/tests", {
      jobId: id,
      question,
      expectedOutput,
    });

    alert("Question added");

    setQuestion("");
    setExpectedOutput("");
  };

  return (
    <div className="dashboard">
      <h2>Add Interview Questions</h2>

      <textarea
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <input
        placeholder="Expected Output"
        value={expectedOutput}
        onChange={(e) => setExpectedOutput(e.target.value)}
      />

      <button onClick={addQuestion}>Add Question</button>
    </div>
  );
}

export default AddQuestions;
