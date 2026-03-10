import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function Submissions() {
  const { jobId } = useParams();

  const [subs, setSubs] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobRes = await API.get(`/jobs/${jobId}`);
        setJob(jobRes.data);

        const subRes = await API.get(`/submissions/${jobId}`);
        setSubs(subRes.data);
      } catch (err) {
        alert("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
            <div key={i} style={{ marginTop: "20px" }}>
              <h4>
                Q{a.questionIndex + 1}.{" "}
                {job?.questions?.[a.questionIndex]?.question}
              </h4>

              <pre
                style={{
                  background: "#111827",
                  color: "#cfe9de",
                  padding: "15px",
                  borderRadius: "6px",
                  overflowX: "auto",
                  marginTop: "8px",
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
