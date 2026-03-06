import { useEffect, useState } from "react";
import API from "../api/api"; // use axios instance with token
import CreateJob from "../components/CreateJob";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Delete Job
  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`);

      alert("Job deleted successfully");

      fetchJobs(); // refresh jobs
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>

      {/* Create Job */}
      <CreateJob fetchJobs={fetchJobs} />

      <h2>Jobs</h2>

      {jobs.length === 0 && <p>No jobs available</p>}

      {jobs.map((job) => (
        <div className="card" key={job._id}>
          <h3>{job.title}</h3>

          <p>{job.description}</p>

          <p>
            <b>Duration:</b> {job.duration || 30} minutes
          </p>

          <div className="admin-buttons">
            <button
              className="view-btn"
              onClick={() =>
                (window.location.href = `/admin/submissions/${job._id}`)
              }
            >
              View Submissions
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
