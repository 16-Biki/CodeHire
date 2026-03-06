import { useEffect, useState } from "react";
import axios from "axios";

function SubmissionList({ jobId }) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/submissions/${jobId}`)
      .then((res) => setSubmissions(res.data));
  }, []);

  return (
    <div>
      <h2>Candidate Submissions</h2>

      {submissions.map((sub) => (
        <div key={sub._id} className="card">
          <p>
            <b>Candidate:</b> {sub.candidateId}
          </p>

          <pre>{sub.code}</pre>
        </div>
      ))}
    </div>
  );
}

export default SubmissionList;
