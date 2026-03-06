import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function Submissions() {
  const { jobId } = useParams();

  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await API.get(`/submissions/${jobId}`);

        setSubs(res.data);
      } catch (err) {
        alert("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [jobId]);

  if (loading) {
    return <h2 className="page">Loading submissions...</h2>;
  }

  if (subs.length === 0) {
    return (
      <div className="page">
        <h2>No submissions yet</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Candidate Submissions</h1>

      {subs.map((s) => (
        <div key={s._id} className="card">
          <h3>{s.candidateId?.name}</h3>

          <p>
            <b>Email:</b> {s.candidateId?.email}
          </p>

          <p>
            <b>Submitted At:</b> {new Date(s.submittedAt).toLocaleString()}
          </p>

          <hr />

          {s.answers.map((a, i) => (
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

export default Submissions;
