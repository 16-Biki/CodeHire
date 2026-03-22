import { useEffect, useState } from "react";
import API from "../api/api";

function CandidateDashboard() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplied = async () => {
      try {
        const res = await API.get("/submissions/my");
        setAppliedJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplied();
  }, []);

  return (
    <div className="page">
      <h1>Candidate Dashboard</h1>

      <h2>Your Applications</h2>

      {loading && (
        <div className="card">
          <p>Loading applications...</p>
        </div>
      )}

      {!loading && appliedJobs.length === 0 && (
        <div className="card">
          <p>You have not applied to any job yet.</p>
        </div>
      )}

      {!loading &&
        appliedJobs.map((sub) => (
          <div key={sub._id} className="card">
            <h3>{sub.jobId?.title}</h3>

            <p>{sub.jobId?.description}</p>

            <p>
              <b>Status:</b>{" "}
              <span style={{ color: "#16a34a", fontWeight: "bold" }}>
                Submitted
              </span>
            </p>

            <p>
              <b>Submitted At:</b> {new Date(sub.submittedAt).toLocaleString()}
            </p>
          </div>
        ))}
    </div>
  );
}

export default CandidateDashboard;
