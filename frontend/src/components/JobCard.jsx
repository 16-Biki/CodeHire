import { Link, useNavigate } from "react-router-dom";

function JobCard({ job, deleteJob }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const isOwner =
    user?.companyId &&
    job?.companyId &&
    user.companyId.toString() === job.companyId.toString();

  return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <p>{job.description}</p>

      {user?.role === "admin" && isOwner && (
        <div className="admin-buttons">
          <button
            className="view-btn"
            onClick={() => navigate(`/admin/submissions/${job._id}`)}
          >
            View Submissions ({job.submissionCount || 0})
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteJob && deleteJob(job._id)}
          >
            Delete Job
          </button>
        </div>
      )}

      {(user?.role === "candidate" || (user?.role === "admin" && !isOwner)) && (
        <Link to={`/test/${job._id}`}>
          <button className="start-btn">Start Test</button>
        </Link>
      )}
    </div>
  );
}

export default JobCard;
