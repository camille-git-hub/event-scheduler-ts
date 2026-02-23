import { useState } from "react";
import { signUp } from "../services/api.js";
import { useNavigate, Link } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function validatePassword() {
    if (!password || !email) {
      return "Please enter a valid email address and a password";
    } else if (password.length < 8) {
      return "Password needs to be at least 8 characters long.";
    }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const validationError = validatePassword();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await signUp({ email, password });
      navigate("/login");
    } catch (e2) {
      setError(e2.message);
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4 mt-10 p-4">
      <h1 className="text-3xl font-bold">Sign Up</h1>

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
          onChange={(e) => setPassword(e.target.value.trim())}
          placeholder="Password"
          type="password"
        />

        <button className="btn btn-primary w-full">Create account</button>
      </form>

      <p className="text-sm opacity-70">
        Already have an account?{" "}
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
