import { useState } from "react";
import API from "../api/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
    companyName: "",
  });

  const [msg, setMsg] = useState("");

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      setMsg("Registered successfully");
    } catch (err) {
      setMsg("Registration failed , email already used !");
    }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Register</h2>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <input name="name" placeholder="Name" onChange={change} />

      <input name="email" placeholder="Email" onChange={change} />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={change}
      />

      <select name="role" onChange={change}>
        <option value="candidate">Candidate</option>
        <option value="admin">Admin</option>
      </select>

      {form.role === "admin" && (
        <input
          name="companyName"
          placeholder="Company Name"
          onChange={change}
        />
      )}

      <button>Register</button>
    </form>
  );
}

export default Register;
