"use client";

import { FaEye as Eye, FaEyeSlash as EyeSlash } from "react-icons/fa";
import { useLoginLogic } from "./useLoginLogic";

const EyeIcon = Eye as React.FC<{ className?: string }>;
const EyeSlashIcon = EyeSlash as React.FC<{ className?: string }>;

export default function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    loading,
    handleSubmit,
  } = useLoginLogic();

  return (
    <div className="flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-6 border-2 border-gray-300 dark:border-white/20 rounded-xl shadow-lg space-y-6 bg-white dark:bg-zinc-900"
      >
        <h2 className="text-2xl font-bold text-center text-foreground">Sign in</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border rounded outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 pr-10 border rounded outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute right-3 top-[55%] text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </span>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 transition"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
