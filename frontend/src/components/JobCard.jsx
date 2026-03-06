import { Link } from "react-router-dom";

function JobCard({ job }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <p>{job.description}</p>

      {/* Candidate */}
      {user?.role === "candidate" && (
        <Link to={`/test/${job._id}`}>
          <button>Start Test</button>
        </Link>
      )}

      {/* Admin */}
      {user?.role === "admin" && (
        <Link to={`/admin/questions/${job._id}`}>
          <button>Add Questions</button>
        </Link>
      )}
    </div>
  );
}

export default JobCard;
