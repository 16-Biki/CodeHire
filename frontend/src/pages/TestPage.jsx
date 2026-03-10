import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import CodeEditor from "../components/CodeEditor";

function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch Job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);

        setJob(res.data);

        const savedTime = localStorage.getItem(`test-${id}`);

        if (savedTime) {
          setTimeLeft(Number(savedTime));
        } else {
          setTimeLeft((res.data.duration || 30) * 60);
        }
      } catch (err) {
        alert("Failed to load test");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  // TIMER
  useEffect(() => {
    if (!timeLeft || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        localStorage.setItem(`test-${id}`, prev);

        if (prev <= 1) {
          clearInterval(timer);
          submitTest(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // Save Answer
  const handleAnswer = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  // Submit Test
  const submitTest = async (autoSubmit = false) => {
    if (submitted) return;

    // Validate answers only if user clicked submit
    if (!autoSubmit) {
      for (let i = 0; i < job.questions.length; i++) {
        if (!answers[i] || answers[i].trim() === "") {
          alert(`Please answer Question ${i + 1}`);
          return;
        }
      }
    }

    try {
      const formatted = Object.keys(answers).map((key) => ({
        questionIndex: Number(key),
        answer: answers[key],
      }));

      await API.post("/submissions", {
        jobId: id,
        answers: formatted,
      });

      alert("Test submitted successfully");

      setSubmitted(true);

      localStorage.removeItem(`test-${id}`);

      navigate("/candidate");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Submission failed. You may have already submitted.",
      );

      navigate("/candidate");
    }
  };

  if (loading) return <h2 className="page">Loading Test...</h2>;

  if (!job) return <h2 className="page">Test not found</h2>;

  return (
    <div className="page">
      <h1>{job.title}</h1>

      <p>{job.description}</p>

      <h3 className="timer">
        ⏳ Time Left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </h3>

      {job.questions &&
        job.questions.map((q, index) => (
          <div key={index} className="card">
            <h3>Question {index + 1}</h3>

            <p>{q.question}</p>

            {/* CODING */}
            {q.type === "coding" && (
              <CodeEditor
                value={answers[index] || ""}
                onChange={(code) => handleAnswer(index, code)}
              />
            )}

            {/* TEXT */}
            {q.type === "text" && (
              <textarea
                placeholder="Write your answer"
                value={answers[index] || ""}
                onChange={(e) => handleAnswer(index, e.target.value)}
              />
            )}

            {/* MCQ */}
            {q.type === "mcq" && (
              <div className="mcq-options">
                {q.options.map((opt, i) => (
                  <label key={i} className="mcq-option">
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={opt}
                      checked={answers[index] === opt}
                      onChange={() => handleAnswer(index, opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

      <button onClick={() => submitTest(false)} disabled={submitted}>
        {submitted ? "Submitted" : "Submit Test"}
      </button>
    </div>
  );
}

export default TestPage;
