import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    // validation
    if (!email || !password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/candidate");
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <form
      className="auth-form"
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
    >
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </form>
  );
}

export default Login;
