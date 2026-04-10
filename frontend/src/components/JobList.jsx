import { useEffect, useState } from "react";
import API from "../api/api";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await API.get("/jobs");

      if (user?.role === "admin") {
        const filtered = res.data.filter(
          (job) => job.companyId === user.companyId,
        );
        setJobs(filtered);
      } else {
        setJobs(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="job-list-container">
      {loading && <p className="job-status">Loading jobs...</p>}

      {!loading && jobs.length === 0 && (
        <p className="job-status">No jobs available</p>
      )}

      {!loading && jobs.length > 0 && (
        <div className="job-list">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
