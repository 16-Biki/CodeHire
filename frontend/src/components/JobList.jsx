import { useEffect, useState } from "react";
import API from "../api/api";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchJobs = async () => {
    const res = await API.get("/jobs");

    if (user?.role === "admin") {
      const filtered = res.data.filter(
        (job) => job.companyId === user.companyId,
      );
      setJobs(filtered);
    } else {
      setJobs(res.data);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      {jobs.length === 0 && <p>No jobs available</p>}

      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
