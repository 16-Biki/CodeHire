import { useEffect, useState } from "react";
import API from "../api/api";
import JobList from "../components/JobList";

function CandidateDashboard() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchApplied = async () => {
      try {
        const res = await API.get("/submissions/my");
        setAppliedJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApplied();
  }, []);

  return (
    <div className="page">
      <h1>Candidate Dashboard</h1>

      {/* Available Jobs Section */}
      <div className="section">
        <h2>Available Jobs</h2>
        <JobList />
      </div>

      {/* Applications Section */}
      <div className="section">
        <h2>Your Applications</h2>

        {appliedJobs.length === 0 && (
          <div className="card">
            <p>You have not applied to any job yet.</p>
          </div>
        )}

        {appliedJobs.map((sub) => (
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
    </div>
  );
}

export default CandidateDashboard;
