import { useState } from "react";
import { login } from "../services/api.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      const data = await login({ email, password });

      loginUser(data.token);

      navigate("/");
    } catch (e2) {
      setError(e2.message);
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4 mt-10 p-4">
      <h1 className="text-3xl font-bold">Login</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />

        <button className="btn btn-primary w-full">Login</button>
      </form>

      <p className="text-sm opacity-70">
        New here? <Link className="link" to="/register">Create account</Link>
      </p>
    </div>
  );
}
