import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const firstVisit = sessionStorage.getItem("visited");

    if (!firstVisit) {
      sessionStorage.setItem("visited", "true");

      if (user?.role === "admin") {
        navigate("/admin");
      } else if (user?.role === "candidate") {
        navigate("/jobs");
      }
    }
  }, []);

  return (
    <div className="page">
      <h1 style={{ color: "#2563eb" }}>CodeHire</h1>

      <p>
        CodeHire is a web-based technical assessment platform designed to help
        companies evaluate developer skills through coding tests and technical
        assignments.
      </p>

      <p>
        Administrators can create job roles, design coding questions, and assign
        time-limited tests to candidates.
      </p>

      <p>
        Candidates can solve coding challenges directly in the browser and
        submit their solutions for review.
      </p>
    </div>
  );
}

export default Home;
