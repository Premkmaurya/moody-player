import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const { login, register, error, clearError, loading } = useAuth();

  // State to toggle between Login and Sign up
  const [isLoginView, setIsLoginView] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    clearError(); // Clear any previous API errors when user types
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginView) {
      await login({ email: formData.email, password: formData.password });
    } else {
      await register(formData);
    }
  };

  // The specific dark navy blue color from your design
  const primaryColor = "#0A1931";
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 relative">
      <div className="w-full max-w-sm">
        {/* Header */}
        <h2
          className="text-4xl font-medium text-center mb-12 tracking-wide"
          style={{ color: primaryColor }}
        >
          {isLoginView ? "Login" : "Sign Up"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Display API Errors */}
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center border border-red-100">
              {error}
            </div>
          )}

          {/* Name Input (Only show if Sign Up) */}
          {!isLoginView && (
            <div className="relative group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none transition-colors"
                style={{ focusBorderColor: primaryColor }}
              />
              {/* Custom animated bottom border line */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0A1931] transition-all duration-300 group-focus-within:w-full"></span>
            </div>
          )}

          {/* Email Input */}
          <div className="relative group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none transition-colors placeholder-gray-500"
            />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0A1931] transition-all duration-300 group-focus-within:w-full"></span>
          </div>

          {/* Password Input */}
          <div className="relative group mt-2">
            <div className="flex justify-between items-end mb-1">
              {/* We use a hidden label to keep spacing perfect, or just rely on placeholder */}
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none transition-colors placeholder-gray-500"
            />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0A1931] transition-all duration-300 group-focus-within:w-full"></span>

            {/* Forgot Password Link (Only on Login) */}
            {isLoginView && (
              <div className="absolute right-0 top-2">
                <a
                  href="#"
                  className="text-xs font-semibold hover:underline"
                  style={{ color: primaryColor }}
                >
                  forgot password?
                </a>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full text-white py-3.5 rounded-[1.25rem] font-medium transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 flex justify-center items-center"
            style={{ backgroundColor: primaryColor }}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : isLoginView ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Bottom Toggle Text */}
        <div className="mt-10 text-center text-sm text-gray-600">
          {isLoginView ? (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setIsLoginView(false);
                  clearError();
                }}
                className="font-semibold hover:underline"
                style={{ color: primaryColor }}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsLoginView(true);
                  clearError();
                }}
                className="font-semibold hover:underline"
                style={{ color: primaryColor }}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
