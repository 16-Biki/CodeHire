import { useEffect, useState } from "react";
import API from "../api/api";

function SubmissionList({ jobId }) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await API.get(`/submissions/${jobId}`);
        setSubmissions(res.data);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      }
    };

    fetchSubmissions();
  }, [jobId]);

  return (
    <div>
      <h2>Candidate Submissions</h2>

      {submissions.length === 0 && <p>No submissions yet.</p>}

      {submissions.map((sub) => (
        <div key={sub._id} className="card">
          <p>
            <b>Candidate:</b> {sub.candidateId?.name}
          </p>

          <p>
            <b>Email:</b> {sub.candidateId?.email}
          </p>

          <p>
            <b>Submitted At:</b> {new Date(sub.submittedAt).toLocaleString()}
          </p>

          <hr />

          {sub.answers.map((a, i) => (
            <div key={i} style={{ marginTop: "15px" }}>
              <h4>Question {a.questionIndex + 1}</h4>

              <pre
                style={{
                  background: "#111827",
                  color: "#cfe9de",
                  padding: "15px",
                  borderRadius: "6px",
                  overflowX: "auto",
                }}
              >
                {a.answer}
              </pre>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SubmissionList;
