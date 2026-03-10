import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import CreateJob from "../components/CreateJob";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await API.get("/jobs");
      const filteredJobs = res.data.filter(
        (job) =>
          job.companyId &&
          user.companyId &&
          job.companyId.toString() === user.companyId.toString(),
      );

      setJobs(filteredJobs);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`);

      alert("Job deleted successfully");

      fetchJobs();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>

      <CreateJob fetchJobs={fetchJobs} />

      <h2>Active Job Listings ({jobs.length})</h2>

      {loading && <p>Loading jobs...</p>}

      {!loading && jobs.length === 0 && <p>No jobs available</p>}

      {!loading &&
        jobs.map((job) => (
          <div className="card" key={job._id}>
            <h3>{job.title}</h3>

            <p>{job.description}</p>

            <p>
              <b>Duration:</b> {job.duration || 30} minutes
            </p>

            <div className="admin-buttons">
              <button
                className="view-btn"
                onClick={() => navigate(`/admin/submissions/${job._id}`)}
              >
                View Submissions ({job.submissionCount || 0})
              </button>

              <button className="delete-btn" onClick={() => deleteJob(job._id)}>
                Delete Job
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AdminDashboard;
