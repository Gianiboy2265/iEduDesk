"use client";
import { useState, useEffect } from "react";
import { account, ID } from "./appwrite";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Attempt to get the current user on component mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user);
        // Redirect to dashboard if logged in
        router.push("/Dashboard");
      } catch (error) {
        // No user logged in or session expired
        setLoggedInUser(null);
      }
    };
    checkUser();
  }, [router]);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      // Redirect to dashboard after successful login
      router.push("/Dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async () => {
    try {
      setIsLoading(true);
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      // Redirect to dashboard after successful registration
      router.push("/Dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      register();
    } else {
      login(email, password);
    }
  };

  // If we detect the user is logged in, we'll redirect to dashboard in the useEffect
  // So we only need to render the login form
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-xl relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            {isRegisterMode ? "Create your Account" : "Sign in to your Account"}
          </h1>
        </div>

        {/* Fixed-height container for toggling tabs */}
        <div className="h-14 mb-6">
          {/* Fixed height container prevents movement */}
          <div className="inline-flex rounded-md shadow-sm w-full">
            <button
              onClick={() => setIsRegisterMode(false)}
              className={`w-1/2 px-6 py-2 text-base font-medium rounded-l-lg transition-colors duration-300 border
                        ${
                          !isRegisterMode
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsRegisterMode(true)}
              className={`w-1/2 px-6 py-2 text-base font-medium rounded-r-lg transition-colors duration-300 border
                        ${
                          isRegisterMode
                            ? "bg-green-500 text-white border-green-500 shadow-md"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form with fixed height container for the username field */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 ${
                isRegisterMode ? "focus:ring-green-500" : "focus:ring-blue-500"
              } focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 ${
                isRegisterMode ? "focus:ring-green-500" : "focus:ring-blue-500"
              } focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Dynamic height container for username field that collapses when not in register mode */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isRegisterMode ? "h-20 mb-2 opacity-100" : "h-0 mb-0 opacity-0"
            }`}
          >
            <div className="transform transition-all duration-500 ease-in-out">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Username
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Full Name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegisterMode}
                tabIndex={isRegisterMode ? 0 : -1}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 font-semibold rounded-lg text-white transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-md
                      ${
                        isRegisterMode
                          ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 focus:ring-green-500"
                          : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-blue-500"
                      } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Processing...
              </span>
            ) : isRegisterMode ? (
              "Create Account"
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {isRegisterMode
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
          >
            {isRegisterMode ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
