import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../services/authApi";
import { setCredentials } from "../authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const result = await register({ name, email, password, role });

    if (result.error) {
      setError(result.error.data?.message || "Could not create account");
      return;
    }

    const { token, ...user } = result.data;

    if (token && user.role) {
      dispatch(setCredentials({ token, user }));
      navigate(user.role === "admin" ? "/dashboard" : "/");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center px-4">
      <div className="w-full py-20 sm:w-96">
        <h2 className="mb-2 text-3xl font-bold text-[#161654]">Sign Up</h2>
        <Link to="/login" className="mb-10 block font-bold text-gray-600">
          Already have an account? Log in
        </Link>

        <form onSubmit={handleSubmit}>
          <p className="mb-1 font-medium text-gray-500">I am signing up as</p>
          <div className="mb-6 flex gap-x-4">
            <RoleOption
              label="Patient"
              value="patient"
              selected={role === "patient"}
              onSelect={() => setRole("patient")}
            />
            <RoleOption
              label="Admin"
              value="admin"
              selected={role === "admin"}
              onSelect={() => setRole("admin")}
            />
          </div>

          <p className="mb-1 font-medium text-gray-500">Full Name</p>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 transition focus:border-[#3EA6E0] focus:outline-none"
              required
            />
          </div>

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
              placeholder="Choose a password (minimum 8 characters)"
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
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

function RoleOption({ label, value, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-32 items-center justify-center rounded-xl border px-4 py-3 font-medium transition ${
        selected
          ? "border-[#3EA6E0] bg-[#E7EEFC] text-[#161654]"
          : "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

export default Signup;