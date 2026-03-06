import { useEffect, useState } from "react";
import API from "../api/api";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/jobs").then((res) => {
      setJobs(res.data);
    });
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
