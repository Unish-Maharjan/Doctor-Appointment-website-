import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaHeartbeat,
  FaUserInjured,
  FaUserShield,
} from "react-icons/fa";
import { useRegisterMutation } from "../services/authApi";
import { setCredentials } from "../Authslice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex min-h-screen">
      {/* Left - brand panel with animated heartbeat line, hidden on small screens */}
      <div className="relative hidden w-full max-w-md flex-col justify-between overflow-hidden bg-[#161654] px-12 py-16 lg:flex">
        <div className="anim-fadeInUp">
          <Link to="/" className="text-sm font-semibold uppercase tracking-widest text-[#dde9fc]/60">
            ← Back to home
          </Link>
          <h1 className="mt-10 font-serif text-4xl font-bold leading-tight text-white">
            Care starts
            <br />
            with an account.
          </h1>
          <p className="mt-4 max-w-xs leading-relaxed text-[#dde9fc]/70">
            Create your profile to book appointments, track visits, and stay connected with your
            doctors.
          </p>
        </div>

        {/* Heartbeat line signature element */}
        <div className="anim-fadeIn [animation-delay:300ms]">
          <svg
            viewBox="0 0 400 80"
            className="w-full text-[#3EA6E0]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 40 H120 L145 10 L170 70 L195 20 L215 40 H400"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="heartbeat-path"
            />
          </svg>
          <div className="mt-6 flex items-center gap-2 text-[#dde9fc]/50">
            <FaHeartbeat className="text-[#3EA6E0]" />
            <span className="text-sm">Trusted care, always available</span>
          </div>
        </div>
      </div>

      {/* Right - form panel */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-16">
        <div className="w-full max-w-sm anim-fadeInUp [animation-delay:100ms]">
          <Link to="/" className="mb-8 block text-sm font-semibold text-gray-400 lg:hidden">
            ← Back to home
          </Link>

          <h2 className="font-serif text-3xl font-bold text-[#161654]">Create your account</h2>
          <Link to="/login" className="mt-2 block text-sm font-medium text-gray-500">
            Already have an account?{" "}
            <span className="font-bold text-[#3EA6E0] hover:underline">Log in</span>
          </Link>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">I am signing up as</label>
              <div className="grid grid-cols-2 gap-3">
                <RoleOption
                  label="Patient"
                  icon={<FaUserInjured />}
                  selected={role === "patient"}
                  onSelect={() => setRole("patient")}
                />
                <RoleOption
                  label="Admin"
                  icon={<FaUserShield />}
                  selected={role === "admin"}
                  onSelect={() => setRole("admin")}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">Full Name</label>
              <div className="group relative">
                <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-[#3EA6E0]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoFocus
                  className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-11 pr-4 text-gray-700 placeholder-gray-400 transition-colors focus:border-[#3EA6E0] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">Email</label>
              <div className="group relative">
                <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-[#3EA6E0]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-11 pr-4 text-gray-700 placeholder-gray-400 transition-colors focus:border-[#3EA6E0] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">Password</label>
              <div className="group relative">
                <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-[#3EA6E0]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-11 pr-11 text-gray-700 placeholder-gray-400 transition-colors focus:border-[#3EA6E0] focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 transition-colors hover:text-[#161654]"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2 flex gap-1">
                  {[0, 1, 2, 3].map((segment) => (
                    <span
                      key={segment}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        password.length >= (segment + 1) * 2
                          ? password.length >= 8
                            ? "bg-[#3EA6E0]"
                            : "bg-amber-400"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="anim-fadeIn flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-500">
                <FaExclamationCircle className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#161654] py-3.5 font-bold text-white transition-all hover:bg-[#3EA6E0] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .heartbeat-path {
          stroke-dasharray: 460;
          stroke-dashoffset: 460;
          animation: draw-heartbeat 2.6s ease-in-out infinite;
        }
        @keyframes draw-heartbeat {
          0% { stroke-dashoffset: 460; }
          45% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -460; }
        }
      `}</style>
    </div>
  );
};

function RoleOption({ label, icon, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-medium transition-colors ${
        selected
          ? "border-[#3EA6E0] bg-[#E7EEFC] text-[#161654]"
          : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default Signup;