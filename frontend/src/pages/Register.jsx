import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
    companyName: "",
  });

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    // validation
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    if (form.role === "admin" && !form.companyName) {
      alert("Please enter company name");
      return;
    }

    try {
      await API.post("/auth/register", form);

      alert("Sign up successful. Please login to continue.");

      navigate("/login");
    } catch (err) {
      alert("Sign up failed. Email may already exist.");
    }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Sign Up</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={change}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={change}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={change}
      />

      <select name="role" value={form.role} onChange={change}>
        <option value="candidate">Candidate</option>
        <option value="admin">Admin</option>
      </select>

      {form.role === "admin" && (
        <input
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={change}
        />
      )}

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Register;
