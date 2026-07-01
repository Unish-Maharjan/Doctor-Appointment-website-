import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/authApi";
import { setCredentials } from "../Authslice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = await login({ email, password });

    if (result.error) {
      setError(result.error.data?.message || "Invalid email or password");
      return;
    }

    const { token, ...user } = result.data;
    dispatch(setCredentials({ token, user }));

    if (user.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center px-4">
      <div className="w-full py-20 sm:w-96">
        <h2 className="mb-2 text-3xl font-bold text-[#161654]">Log In</h2>
        <Link to="/signup" className="mb-10 block font-bold text-gray-600">
          Don't have an account? Sign up
        </Link>

        <form onSubmit={handleSubmit}>
          <p className="mb-1 font-medium text-gray-500">Email</p>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 transition focus:border-[#3EA6E0] focus:outline-none"
              required
            />
          </div>

          <p className="mb-1 font-medium text-gray-500">Password</p>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 transition focus:border-[#3EA6E0] focus:outline-none"
              required
            />
          </div>

          {error && <p className="mb-4 text-sm font-medium text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-[#161654] px-8 py-3 font-bold text-white transition-all hover:bg-[#3EA6E0] hover:opacity-90 hover:shadow-lg disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;